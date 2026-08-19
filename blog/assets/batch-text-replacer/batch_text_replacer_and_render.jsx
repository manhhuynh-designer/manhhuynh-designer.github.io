/**
 * =========================================================================
 * BATCH TEXT REPLACER & AUTO RENDER SCRIPT FOR ADOBE AFTER EFFECTS
 * =========================================================================
 * Tự động thay thế nội dung Text Layer theo danh sách từ file CSV/TXT
 * và xuất hàng loạt video tương ứng vào Render Queue (Hỗ trợ chuẩn H.264 MP4 / MOV).
 *
 * Tương thích: After Effects CC 2020 -> 2026+
 * Hỗ trợ tiếng Việt Unicode (UTF-8)
 * =========================================================================
 */

(function(thisObj) {
    // -------------------------------------------------------------------------
    // Helper Functions
    // -------------------------------------------------------------------------
    function sanitizeFilename(name) {
        if (!name) return "Render_Output";
        var clean = name.replace(/[\\\/:\*\?"<>\|\r\n]/g, "_").replace(/^\s+|\s+$/g, "");
        if (clean.length > 80) {
            clean = clean.substring(0, 80);
        }
        return clean.length === 0 ? "Output" : clean;
    }

    function parseCSVLine(line) {
        var result = [];
        var current = "";
        var inQuotes = false;
        
        for (var i = 0; i < line.length; i++) {
            var ch = line.charAt(i);
            if (ch === '"') {
                if (inQuotes && i + 1 < line.length && line.charAt(i + 1) === '"') {
                    current += '"';
                    i++; // skip escaped quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (ch === ',' && !inQuotes) {
                result.push(current.replace(/^\s+|\s+$/g, ""));
                current = "";
            } else if (ch === '\t' && !inQuotes) {
                result.push(current.replace(/^\s+|\s+$/g, ""));
                current = "";
            } else {
                current += ch;
            }
        }
        result.push(current.replace(/^\s+|\s+$/g, ""));
        return result;
    }

    function readCSVList(fileObj, colIndex, skipHeader) {
        var items = [];
        if (!fileObj || !fileObj.exists) return items;

        fileObj.encoding = "UTF-8";
        if (fileObj.open("r")) {
            var isFirstLine = true;
            while (!fileObj.eof) {
                var line = fileObj.readln();
                if (!line || line.replace(/\s/g, "").length === 0) continue;

                if (isFirstLine && skipHeader) {
                    isFirstLine = false;
                    continue;
                }
                isFirstLine = false;

                var cols = parseCSVLine(line);
                var val = "";
                if (colIndex < cols.length) {
                    val = cols[colIndex];
                } else if (cols.length > 0) {
                    val = cols[0];
                }

                if (val && val.length > 0) {
                    items.push(val);
                }
            }
            fileObj.close();
        }
        return items;
    }

    /**
     * Lấy danh sách các Output Module Templates có sẵn trong After Effects
     */
    function getAvailableOutputTemplates() {
        var list = [];
        try {
            if (app.project) {
                var dummyComp = null;
                var createdDummy = false;
                for (var i = 1; i <= app.project.numItems; i++) {
                    if (app.project.item(i) instanceof CompItem) {
                        dummyComp = app.project.item(i);
                        break;
                    }
                }
                if (!dummyComp) {
                    dummyComp = app.project.items.addComp("_TemplateProbe_", 100, 100, 1, 1, 30);
                    createdDummy = true;
                }
                var rqItem = app.project.renderQueue.items.add(dummyComp);
                var om = rqItem.outputModule(1);
                for (var t = 0; t < om.templates.length; t++) {
                    var tName = om.templates[t];
                    if (tName && tName.indexOf("_") !== 0) {
                        list.push(tName);
                    }
                }
                rqItem.remove();
                if (createdDummy) {
                    dummyComp.remove();
                }
            }
        } catch(e) {}
        
        return list;
    }

    /**
     * Cấu hình Output Module: Áp dụng Template H.264/MP4 trước, sau đó gán đường dẫn File.
     */
    function setupOutputModule(om, chosenTemplate, formatExt, targetFile) {
        if (!om || !targetFile) return false;

        var applied = false;
        var templates = om.templates || [];

        // 1. Nếu người dùng chọn một Template cụ thể
        if (chosenTemplate && chosenTemplate !== "[Tự động theo định dạng]") {
            try {
                om.applyTemplate(chosenTemplate);
                applied = true;
            } catch(e) {}
        } else if (formatExt === ".mp4") {
            // 2. Nếu chọn Tự động theo định dạng đuôi .mp4 -> tìm template H.264
            for (var t = 0; t < templates.length; t++) {
                if (templates[t] === "H.264") {
                    try {
                        om.applyTemplate("H.264");
                        applied = true;
                        break;
                    } catch(e) {}
                }
            }
            if (!applied) {
                for (var t = 0; t < templates.length; t++) {
                    var tName = templates[t];
                    if (tName.indexOf("H.264") !== -1 || tName.indexOf("h.264") !== -1 || tName.indexOf("MP4") !== -1) {
                        try {
                            om.applyTemplate(tName);
                            applied = true;
                            break;
                        } catch(e) {}
                    }
                }
            }
        } else if (formatExt === ".mov") {
            for (var t = 0; t < templates.length; t++) {
                var tName = templates[t];
                if (tName === "High Quality" || tName === "High Quality with Audio" || tName.indexOf("ProRes") !== -1 || tName === "Lossless") {
                    try {
                        om.applyTemplate(tName);
                        applied = true;
                        break;
                    } catch(e) {}
                }
            }
        }

        // 3. QUAN TRỌNG: Gán đường dẫn file SAU KHI applyTemplate (vì applyTemplate sẽ reset tên file)
        try {
            om.file = targetFile;
        } catch(errFile1) {
            try {
                om.file = new File(targetFile.fsName);
            } catch(errFile2) {}
        }

        return applied;
    }

    /**
     * Thay đổi nội dung text trên một Text Layer (Hỗ trợ xử lý Keyframes & Expressions)
     */
    function applyTextToLayer(targetLayer, newText) {
        if (!targetLayer) return false;

        var textProp = null;
        try {
            textProp = targetLayer.property("ADBE Text Properties").property("ADBE Text Document");
        } catch(e) {}
        if (!textProp) {
            try {
                textProp = targetLayer.property("Source Text");
            } catch(e) {}
        }
        if (!textProp) return false;

        // Vô hiệu hóa Expression nếu đang bật để tránh ghi đè
        try {
            if (textProp.canSetExpression && textProp.expressionEnabled) {
                textProp.expressionEnabled = false;
            }
        } catch(e) {}

        // Xóa Keyframes cũ trên Source Text nếu có để nội dung mới áp dụng cố định
        try {
            if (textProp.numKeys > 0) {
                for (var k = textProp.numKeys; k >= 1; k--) {
                    textProp.removeKey(k);
                }
            }
        } catch(e) {}

        // Gán nội dung mới thông qua TextDocument
        try {
            var textDoc = textProp.value;
            textDoc.text = newText;
            textProp.setValue(textDoc);
            return true;
        } catch(err1) {
            try {
                // Fallback gán chuỗi trực tiếp
                textProp.setValue(newText);
                return true;
            } catch(err2) {
                return false;
            }
        }
    }

    /**
     * Tìm và cập nhật Text Layer trong Composition
     */
    function updateTextInComposition(comp, targetIdx, targetName, newText) {
        if (!comp) return false;

        // 1. Thử tìm theo Index chính xác
        if (targetIdx > 0 && targetIdx <= comp.numLayers) {
            var lyr = comp.layer(targetIdx);
            if (lyr && applyTextToLayer(lyr, newText)) {
                return true;
            }
        }

        // 2. Thử tìm theo Tên Layer chính xác
        if (targetName && targetName.length > 0) {
            for (var l = 1; l <= comp.numLayers; l++) {
                var layer = comp.layer(l);
                if (layer.name === targetName) {
                    if (applyTextToLayer(layer, newText)) {
                        return true;
                    }
                }
            }
        }

        // 3. Fallback: Tìm Text Layer đầu tiên có trong Comp
        for (var l = 1; l <= comp.numLayers; l++) {
            var layer = comp.layer(l);
            if (layer instanceof TextLayer || layer.property("Source Text") !== null) {
                if (applyTextToLayer(layer, newText)) {
                    return true;
                }
            }
        }

        return false;
    }

    // -------------------------------------------------------------------------
    // GUI Builder
    // -------------------------------------------------------------------------
    function buildUI(container) {
        var win = (container instanceof Panel) ? container : new Window("palette", "🎬 Batch Text Replacer & Auto Render", undefined, {resizeable: true});
        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 10;
        win.margins = 16;

        // 1. Panel: Composition & Layer Source
        var compPanel = win.add("panel", undefined, "1. Chọn Composition & Text Layer");
        compPanel.orientation = "column";
        compPanel.alignChildren = ["fill", "top"];
        compPanel.spacing = 8;
        compPanel.margins = 12;

        var compRow = compPanel.add("group");
        compRow.orientation = "row";
        compRow.alignChildren = ["left", "center"];
        compRow.add("statictext", undefined, "Composition:");
        var compDropdown = compRow.add("dropdownlist", undefined, []);
        compDropdown.size = [280, 26];

        var layerRow = compPanel.add("group");
        layerRow.orientation = "row";
        layerRow.alignChildren = ["left", "center"];
        layerRow.add("statictext", undefined, "Text Layer:    ");
        var layerDropdown = layerRow.add("dropdownlist", undefined, []);
        layerDropdown.size = [280, 26];

        var btnRefresh = compPanel.add("button", undefined, "🔄 Cập nhật danh sách Comps / Layers");

        // 2. Panel: CSV / Data Source
        var csvPanel = win.add("panel", undefined, "2. Danh sách tên (File CSV / TXT)");
        csvPanel.orientation = "column";
        csvPanel.alignChildren = ["fill", "top"];
        csvPanel.spacing = 8;
        csvPanel.margins = 12;

        var csvFileRow = csvPanel.add("group");
        csvFileRow.orientation = "row";
        var txtCsvPath = csvFileRow.add("edittext", undefined, "Chưa chọn file CSV...");
        txtCsvPath.size = [280, 26];
        txtCsvPath.enabled = false;
        var btnBrowseCsv = csvFileRow.add("button", undefined, "📁 Chọn File...");

        var csvOptRow = csvPanel.add("group");
        csvOptRow.orientation = "row";
        var chkSkipHeader = csvOptRow.add("checkbox", undefined, "Bỏ qua dòng đầu (Header)");
        chkSkipHeader.value = true;
        csvOptRow.add("statictext", undefined, " | Cột lấy dữ liệu (0-index):");
        var txtColIndex = csvOptRow.add("edittext", undefined, "0");
        txtColIndex.size = [35, 22];

        var lblPreview = csvPanel.add("statictext", undefined, "Số lượng tên nạp được: 0 dòng");
        var listPreview = csvPanel.add("listbox", undefined, [], {multiselect: false});
        listPreview.size = [360, 80];

        // 3. Panel: Thư mục xuất Video & Render Module
        var outPanel = win.add("panel", undefined, "3. Thư mục xuất Video & Định dạng Render");
        outPanel.orientation = "column";
        outPanel.alignChildren = ["fill", "top"];
        outPanel.spacing = 8;
        outPanel.margins = 12;

        var outFolderRow = outPanel.add("group");
        outFolderRow.orientation = "row";
        var txtOutDir = outFolderRow.add("edittext", undefined, "");
        txtOutDir.size = [280, 26];
        var btnBrowseOut = outFolderRow.add("button", undefined, "📂 Thư mục...");

        // Định dạng đuôi & Output Module Template
        var optRow1 = outPanel.add("group");
        optRow1.orientation = "row";
        optRow1.add("statictext", undefined, "Định dạng đuôi:  ");
        var extDropdown = optRow1.add("dropdownlist", undefined, [".mp4", ".mov", ".avi"]);
        extDropdown.selection = 0; // Mặc định .mp4

        var optRow2 = outPanel.add("group");
        optRow2.orientation = "row";
        optRow2.add("statictext", undefined, "Output Template:");
        var templateDropdown = optRow2.add("dropdownlist", undefined, ["[Tự động theo định dạng]"]);
        templateDropdown.size = [240, 24];
        templateDropdown.selection = 0;

        // 4. Progress & Action
        var progBar = win.add("progressbar", undefined, 0, 100);
        progBar.size = [380, 14];
        var lblStatus = win.add("statictext", undefined, "Sẵn sàng.");

        var btnActionRow = win.add("group");
        btnActionRow.orientation = "row";
        btnActionRow.alignment = ["center", "top"];
        var btnRun = btnActionRow.add("button", undefined, "🚀 TẠO BATCH & THÊM VÀO RENDER QUEUE");
        btnRun.size = [360, 36];

        // ---------------------------------------------------------------------
        // State storage arrays (Tránh lỗi mất custom properties trên ScriptUI)
        // ---------------------------------------------------------------------
        var availableComps = [];    // Danh sách CompItem thực tế
        var availableLayers = [];   // Danh sách layer { index, name }
        var selectedCsvFile = null;
        var selectedOutFolder = null;
        var loadedNames = [];

        if (Folder.desktop) {
            selectedOutFolder = Folder.desktop;
            txtOutDir.text = Folder.desktop.fsName;
        }

        // ---------------------------------------------------------------------
        // UI Logic & Event Handlers
        // ---------------------------------------------------------------------
        function loadTemplates() {
            var avail = getAvailableOutputTemplates();
            templateDropdown.removeAll();
            templateDropdown.add("item", "[Tự động theo định dạng]");
            
            var h264Idx = -1;
            for (var i = 0; i < avail.length; i++) {
                templateDropdown.add("item", avail[i]);
                if (avail[i] === "H.264" || avail[i].indexOf("H.264") !== -1) {
                    if (h264Idx === -1) h264Idx = i + 1;
                }
            }
            templateDropdown.selection = (h264Idx !== -1) ? h264Idx : 0;
        }

        function refreshComps() {
            compDropdown.removeAll();
            layerDropdown.removeAll();
            availableComps = [];
            availableLayers = [];

            if (!app.project || app.project.numItems === 0) {
                lblStatus.text = "Không có project nào đang mở!";
                return;
            }

            var compCount = 0;
            var activeCompIndex = -1;
            var currentActive = app.project.activeItem;

            for (var i = 1; i <= app.project.numItems; i++) {
                var item = app.project.item(i);
                if (item instanceof CompItem) {
                    compDropdown.add("item", item.name);
                    availableComps.push(item);
                    if (currentActive && currentActive.id === item.id) {
                        activeCompIndex = compCount;
                    }
                    compCount++;
                }
            }

            if (compCount > 0) {
                compDropdown.selection = (activeCompIndex >= 0) ? activeCompIndex : 0;
                refreshLayers();
            } else {
                lblStatus.text = "Không tìm thấy composition nào trong project.";
            }

            loadTemplates();
        }

        function refreshLayers() {
            layerDropdown.removeAll();
            availableLayers = [];

            var selIdx = compDropdown.selection ? compDropdown.selection.index : -1;
            if (selIdx < 0 || selIdx >= availableComps.length) return;

            var comp = availableComps[selIdx];
            if (!comp) return;

            var textLayerCount = 0;

            for (var l = 1; l <= comp.numLayers; l++) {
                var layer = comp.layer(l);
                if (layer instanceof TextLayer || (layer.property("Source Text") !== null)) {
                    layerDropdown.add("item", "[" + layer.index + "] " + layer.name);
                    availableLayers.push({
                        index: layer.index,
                        name: layer.name
                    });
                    textLayerCount++;
                }
            }

            if (textLayerCount > 0) {
                layerDropdown.selection = 0;
                lblStatus.text = "Đã tìm thấy " + textLayerCount + " text layer trong comp: " + comp.name;
            } else {
                lblStatus.text = "⚠️ Comp này không có Text Layer nào!";
            }
        }

        function reloadCSV() {
            if (!selectedCsvFile) return;
            var colIdx = parseInt(txtColIndex.text, 10);
            if (isNaN(colIdx) || colIdx < 0) colIdx = 0;

            loadedNames = readCSVList(selectedCsvFile, colIdx, chkSkipHeader.value);
            listPreview.removeAll();

            for (var i = 0; i < loadedNames.length; i++) {
                if (i < 100) {
                    listPreview.add("item", (i + 1) + ". " + loadedNames[i]);
                }
            }
            lblPreview.text = "Đã nạp thành công: " + loadedNames.length + " tên";
        }

        btnRefresh.onClick = function() {
            refreshComps();
        };

        compDropdown.onChange = function() {
            refreshLayers();
        };

        extDropdown.onChange = function() {
            var ext = extDropdown.selection ? extDropdown.selection.text : ".mp4";
            if (ext === ".mp4") {
                for (var i = 0; i < templateDropdown.items.length; i++) {
                    if (templateDropdown.items[i].text.indexOf("H.264") !== -1) {
                        templateDropdown.selection = i;
                        break;
                    }
                }
            } else if (ext === ".mov") {
                for (var i = 0; i < templateDropdown.items.length; i++) {
                    if (templateDropdown.items[i].text.indexOf("High Quality") !== -1 || templateDropdown.items[i].text.indexOf("Lossless") !== -1) {
                        templateDropdown.selection = i;
                        break;
                    }
                }
            }
        };

        btnBrowseCsv.onClick = function() {
            var file = File.openDialog("Chọn file CSV hoặc TXT danh sách tên", "*.csv;*.txt");
            if (file) {
                selectedCsvFile = file;
                txtCsvPath.text = file.fsName;
                reloadCSV();
            }
        };

        chkSkipHeader.onClick = function() {
            reloadCSV();
        };

        txtColIndex.onChange = function() {
            reloadCSV();
        };

        txtOutDir.onChange = function() {
            var pathStr = txtOutDir.text.replace(/^\s+|\s+$/g, "");
            if (pathStr.length > 0) {
                selectedOutFolder = new Folder(pathStr);
            }
        };

        btnBrowseOut.onClick = function() {
            var folder = Folder.selectDialog("Chọn thư mục xuất video");
            if (folder) {
                selectedOutFolder = folder;
                txtOutDir.text = folder.fsName;
            }
        };

        // ---------------------------------------------------------------------
        // Execution: Batch Duplication & Render Queue
        // ---------------------------------------------------------------------
        btnRun.onClick = function() {
            var compSelIdx = compDropdown.selection ? compDropdown.selection.index : -1;
            if (compSelIdx < 0 || compSelIdx >= availableComps.length) {
                alert("Vui lòng chọn một Composition!");
                return;
            }

            var layerSelIdx = layerDropdown.selection ? layerDropdown.selection.index : -1;
            if (layerSelIdx < 0 || layerSelIdx >= availableLayers.length) {
                alert("Vui lòng chọn một Text Layer để thay thế nội dung!");
                return;
            }

            if (!loadedNames || loadedNames.length === 0) {
                alert("Danh sách tên đang trống! Vui lòng chọn file CSV/TXT hợp lệ.");
                return;
            }

            // Lấy đường dẫn thư mục xuất trực tiếp từ ô nhập (Hỗ trợ gõ tay / dán đường dẫn)
            var rawOutDir = txtOutDir.text.replace(/^\s+|\s+$/g, "");
            if (!rawOutDir || rawOutDir.length === 0) {
                alert("Vui lòng nhập hoặc chọn thư mục xuất video!");
                return;
            }

            var finalOutFolder = new Folder(rawOutDir);
            if (!finalOutFolder.exists) {
                try {
                    finalOutFolder.create();
                } catch(e) {}
            }

            if (!finalOutFolder.exists) {
                alert("Thư mục xuất video không tồn tại và không thể tạo:\n" + rawOutDir + "\nVui lòng kiểm tra lại quyền truy cập hoặc đường dẫn!");
                return;
            }
            selectedOutFolder = finalOutFolder;
            var cleanFolderFs = finalOutFolder.fsName.replace(/[\\\/]+$/, "");

            var sourceComp = availableComps[compSelIdx];
            var targetLayerInfo = availableLayers[layerSelIdx];
            var targetLayerIdx = targetLayerInfo.index;
            var targetLayerName = targetLayerInfo.name;

            var ext = extDropdown.selection ? extDropdown.selection.text : ".mp4";
            var chosenTemplate = templateDropdown.selection ? templateDropdown.selection.text : "[Tự động theo định dạng]";

            var confirmMsg = "Bắt đầu tạo " + loadedNames.length + " video từ comp '" + sourceComp.name + "'?\n\n" +
                             "• Text Layer: [" + targetLayerIdx + "] " + targetLayerName + "\n" +
                             "• Định dạng: " + ext + " (" + chosenTemplate + ")\n" +
                             "• Thư mục xuất: " + cleanFolderFs;
            if (!confirm(confirmMsg)) return;

            app.beginUndoGroup("Batch Replace Text & Render");
            try {
                progBar.value = 0;
                progBar.maxvalue = loadedNames.length;
                lblStatus.text = "Đang xử lý...";

                var folderName = "Batch_" + sourceComp.name + "_" + (new Date().getTime().toString().slice(-4));
                var batchFolder = app.project.items.addFolder(folderName);

                var successCount = 0;
                var failedNames = [];

                for (var i = 0; i < loadedNames.length; i++) {
                    var rawName = loadedNames[i];
                    var safeName = sanitizeFilename(rawName);
                    if (!safeName) safeName = "Video_" + (i + 1);

                    // 1. Duplicate Composition
                    var dupComp = sourceComp.duplicate();
                    dupComp.name = sourceComp.name + "_" + safeName;
                    dupComp.parentFolder = batchFolder;

                    // 2. ⭐ CẬP NHẬT NỘI DUNG TEXT LAYER ⭐
                    var textUpdated = updateTextInComposition(dupComp, targetLayerIdx, targetLayerName, rawName);
                    
                    if (!textUpdated) {
                        failedNames.push(rawName);
                    }

                    // 3. Thêm vào Render Queue
                    var rqItem = app.project.renderQueue.items.add(dupComp);
                    
                    // Cấu hình Output Module: Apply template TRƯỚC, rồi set đường dẫn file
                    if (rqItem.numOutputModules > 0) {
                        var om = rqItem.outputModule(1);
                        var targetFile = new File(cleanFolderFs + "/" + safeName + ext);
                        setupOutputModule(om, chosenTemplate, ext, targetFile);
                    }

                    successCount++;
                    progBar.value = i + 1;
                    lblStatus.text = "Đã tạo: " + (i + 1) + "/" + loadedNames.length + " (" + safeName + ")";
                }

                app.endUndoGroup();

                if (failedNames.length > 0) {
                    alert("⚠️ Cảnh báo: Có " + failedNames.length + " comp không thể cập nhật text layer:\n" + failedNames.slice(0, 5).join(", ") + "...\nVui lòng kiểm tra lại cấu trúc layer.");
                }

                lblStatus.text = "Hoàn tất! Đã thêm " + successCount + " video vào Render Queue.";
                alert("✨ ĐÃ TẠO THÀNH CÔNG " + successCount + " COMPOSITION!\n\n" +
                      "• Toàn bộ Text Layer đã được thay đổi chính xác theo danh sách tên.\n" +
                      "• Các comp đã được gom vào thư mục '" + folderName + "' và thêm vào Render Queue.\n\n" +
                      "Bạn có thể nhấn nút 'Render' trong After Effects để xuất video bất cứ lúc nào.");

            } catch (err) {
                app.endUndoGroup();
                alert("❌ Đã xảy ra lỗi: " + err.toString());
                lblStatus.text = "Lỗi: " + err.toString();
            }
        };

        // Initialize UI values
        refreshComps();

        return win;
    }

    // Launch UI
    var myScriptUI = buildUI(thisObj);
    if (myScriptUI instanceof Window) {
        myScriptUI.center();
        myScriptUI.show();
    }

})(this);
