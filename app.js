document.addEventListener("DOMContentLoaded", function() {

    let parrainsData = [];

    let filleulsData = [];



    // Fonction pour lire le fichier CSV 

    function readCSV(file, callback) {

        const reader = new FileReader();

        reader.onload = function(e) {

            const text = e.target.result;

            // Sépare les lignes et les colonnes du CSV 

            const rows = text.split('\n').map(row => row.split(','));

            callback(rows);

        };

        reader.readAsText(file);

    }



    // Événement lors du clic sur le bouton de génération 

    document.getElementById('generate').addEventListener('click', function(event) {

        event.preventDefault();

        const parrainFile = document.getElementById('fileParrains').files[0];

        const filleulFile = document.getElementById('fileFilleuls').files[0];



        // Lire le fichier des parrains 

        if (parrainFile) {

            readCSV(parrainFile, function(data) {

                parrainsData = data;

                displayData(); // Affiche les données 

            });

        }



        // Lire le fichier des filleuls 

        if (filleulFile) {

            readCSV(filleulFile, function(data) {

                filleulsData = data;

                displayData(); // Affiche les données 

            });

        }

    });



    // Fonction pour afficher les données dans le tableau 

    function displayData() {

        const resultDiv = document.getElementById('result');

        resultDiv.innerHTML = ''; // Vide le contenu précédent



        // Vérifie si les données des parrains existent 

        if (parrainsData.length > 0) {

            const parrainsTable = createTable(parrainsData, 'Parrains'); // Crée le tableau des parrains 

            resultDiv.appendChild(parrainsTable); // Ajoute le tableau au div de résultats 

        }



        // Vérifie si les données des filleuls existent 

        if (filleulsData.length > 0) {

            const filleulsTable = createTable(filleulsData, 'Filleuls'); // Crée le tableau des filleuls 

            resultDiv.appendChild(filleulsTable); // Ajoute le tableau au div de résultats 

        }

    }



    // Fonction pour créer un tableau à partir des données 

    function createTable(data, title) {

        const table = document.createElement('table');

        table.border = '1';



        const thead = document.createElement('thead');

        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');



        // Crée les en-têtes de colonnes à partir de la première ligne des données 

        data[0].forEach(headerText => {

            const th = document.createElement('th');

            th.innerText = headerText; // Inclut le numéro de téléphone ici 

            headerRow.appendChild(th);

        });

        thead.appendChild(headerRow);

        table.appendChild(thead);



        // Remplit le corps du tableau avec les données 

        for (let i = 1; i < data.length; i++) {

            const row = document.createElement('tr');

            data[i].forEach(cellText => {

                const td = document.createElement('td');

                td.innerText = cellText; // Inclut également le numéro de téléphone ici 

                row.appendChild(td);

            });

            tbody.appendChild(row);

        }

        table.appendChild(tbody);



        const titleElement = document.createElement('h3');

        titleElement.innerText = title; // Titre du tableau

        const container = document.createElement('div');

        container.appendChild(titleElement);

        container.appendChild(table);

        return container; // Retourne le conteneur du tableau 

    }



    // Événement pour générer le PDF 

    document.getElementById('generate-button').addEventListener('click', function() {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        const tables = document.querySelectorAll('#result table');



        // Vérifie si des tableaux existent à exporter 

        if (tables.length > 0) {

            tables.forEach((table, index) => {

                const rows = [];

                const header = Array.from(table.querySelectorAll('tr:first-child th')).map(th => th.innerText);

                rows.push(header); // Inclut les en-têtes dans le PDF 



                // Remplit les lignes 

                Array.from(table.querySelectorAll('tr:not(:first-child)')).forEach(row => {



                    const cells = Array.from(row.querySelectorAll('td')).map(td => td.innerText);

                    rows.push(cells); // Inclut les données dans le tableau 

                });



                // Ajoute le tableau au PDF 

                doc.autoTable({

                    head: [header],

                    body: rows,

                    startY: doc.autoTable.previous ? doc.autoTable.previous.finalY + 10 : 20,

                    margin: { horizontal: 10 },

                    theme: 'grid',

                });



                // Ajoute une page pour le tableau suivant si plusieurs tableaux existent 

                if (index < tables.length - 1) {

                    doc.addPage();

                }

            });



            // Enregistre le document PDF 

            doc.save('parrains_filleuls.pdf');

        } else {

            alert('Aucun tableau à exporter !'); // Alerte si aucun tableau 

        }

    });

});