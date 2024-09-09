document.addEventListener("DOMContentLoaded", function() { 
    let parrainsData = []; 
    let filleulsData = []; 
    function readCSV(file, callback) { 
        const reader = new FileReader(); 
        reader.onload = function (e) { 
            const text = e.target.result; 
            const rows = text.split('\n').map(row => row.split(',')); 
            callback(rows); 
        }; reader.readAsText(file); 
    } document.getElementById('generate').addEventListener('click', function (event) { 
        event.preventDefault(); 
        const parrainFile = document.getElementById('fileParrains').files[0]; 
        const filleulFile = document.getElementById('fileFilleuls').files[0]; 
        if (parrainFile) { 
            readCSV(parrainFile, function(data) { 
                parrainsData = data; 
                displayData(); 
            }); 
        } 

        if (filleulFile) { 
            readCSV(filleulFile, function(data) { 
                filleulsData = data; 
                displayData(); 
            }); 
        } 
    }); 
    function displayData() { 
        const resultDiv = document.getElementById('result'); 
        resultDiv.innerHTML = ''; 
        if (parrainsData.length > 0) { 
            const parrainsTable = createTable(parrainsData, 'Parrains'); 
            resultDiv.appendChild(parrainsTable); 
        } 

        if (filleulsData.length > 0) { 
            const filleulsTable = createTable(filleulsData, 'Filleuls'); 
            resultDiv.appendChild(filleulsTable); 
        } 
    } 
    function createTable(data, title) { 
        const table = document.createElement('table'); 
        table.border = '1'; 
        const thead = document.createElement('thead'); 
        const tbody = document.createElement('tbody'); 
        const headerRow = document.createElement('tr'); 
        data[0].forEach(headerText => { 
            const th = document.createElement('th'); 
            th.innerText = headerText; 
            headerRow.appendChild(th); 
        }); 
        thead.appendChild(headerRow); 
        table.appendChild(thead); 
        for (let i = 1; i < data.length; i++) { 
            const row = document.createElement('tr'); 
            data[i].forEach(cellText => { 
                const td = document.createElement('td'); 
                td.innerText = cellText; row.appendChild(td); 
            }); 
            tbody.appendChild(row); 
        } table.appendChild(tbody); 
        const titleElement = document.createElement('h3'); 
        titleElement.innerText = title; 
        const container = document.createElement('div'); 
        container.appendChild(titleElement); 
        container.appendChild(table); 
        return container; 
    } 
    document.getElementById('generate-button').addEventListener('click', function () { 
        const { jsPDF } = window.jspdf; 
        const doc = new jsPDF(); 
        const tables = document.querySelectorAll('#result table'); 
        if (tables.length > 0) { 
            tables.forEach((table, index) => { 
                const rows = []; 
                const header = Array.from(table.querySelectorAll('tr:first-child th')).map(th => th.innerText); 
                rows.push(header); Array.from(table.querySelectorAll('tr:not(:first-child)')).forEach(tr => { 
                    const row = Array.from(tr.querySelectorAll('td')).map(td => td.innerText); 
                    rows.push(row); }); 
                    // Vérifiez si autoTable est disponible 
                    if (doc.autoTable) { 
                        doc.autoTable({ 
                            head: [header], 
                            body: rows.slice(1), 
                            startY: doc.lastAutoTable ? 
                            doc.lastAutoTable.finalY + 10 : 20, 
                        }); 
                    } else { console.error("La méthode autoTable n'est pas disponible."); } 
                }); 
                doc.save('data.pdf'); 
            } else { alert("Aucune donnée à exporter !"); } 
        }); 
         // Signature
    jsPDF.text('AE-ISTC Parrainage 2024-2025', 10, yOffset + 10)
    });