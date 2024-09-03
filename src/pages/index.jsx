import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Index = () => {
    const [parrains, setParrains] = useState([]);
    const [filleuls, setFilleuls] = useState([]);

    const handleFileUpload = (event, setter) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setter(jsonData.flat());
        };

        reader.readAsArrayBuffer(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (parrains.length === 0 || filleuls.length === 0) {
            alert(
                "Veuillez télécharger les fichiers de parrains et de filleuls.",
            );
            return;
        }

        // Attribution aléatoire des filleuls aux parrains
        const shuffledFilleuls = filleuls.sort(() => 0.5 - Math.random());
        const attribution = [["Parrains", "Filleuls"]]; //Les titres ici
        let parrainIndex = 0;

        shuffledFilleuls.forEach((filleul) => {
            attribution.push([filleul, parrains[parrainIndex]]);
            parrainIndex++;
            if (parrainIndex >= parrains.length) {
                parrainIndex = 0;
            }
        });

        // Préparation du fichier Excel
        const worksheet = XLSX.utils.aoa_to_sheet(attribution);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attribution");

        // Génération du fichier Excel
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(file, "attribution_parrain_filleul.xlsx");
    };

    return (
        <div>
            <div className="container">
                <h1>Attribution Parrains et Filleuls</h1>
                <form id="uploadForm" onSubmit={handleSubmit}>
                    <label htmlFor="fileParrains">
                        Le fichier des parrains
                    </label>
                    <input
                        type="file"
                        id="fileParrains"
                        accept=".csv, .xlsx"
                        required
                        className="input-group"
                        onChange={(e) => handleFileUpload(e, setParrains)}
                    />

                    <label htmlFor="fileFilleuls">
                        Le fichier des filleuls
                    </label>
                    <input
                        type="file"
                        id="fileFilleuls"
                        accept=".csv, .xlsx"
                        required
                        className="input-group"
                        onChange={(e) => handleFileUpload(e, setFilleuls)}
                    />

                    <button id="generate" type="submit">
                        Générer le fichier
                    </button>
                </form>
                <div id="result" />
            </div>
        </div>
    );
};

export default Index;
