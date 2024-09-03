
    document.getElementById('generate').addEventListener('click', function() { 
        const fileParrainsInput = document.getElementById('fileParrains');
        const fileFilleulsInput = document.getElementById('fileFilleuls');
        // Vérifier si les fichiers sont sélectionnés
        if(fileParrainsInput.files.length === 0 || fileFilleulsInput.files.length === 0){
            alert('Veuillez sélectionner les fichiers des parrains et des filleuls');
            return;
        }
        const fileParrains = fileParrainsInput.files[0];
        console.log('Fichier parrains:', fileParrains.name);

        const fileFilleuls = fileFilleulsInput.files[0];
        console.log('Fichier filleuls:', fileFilleuls.name);
    });
    document.getElementById('uploadForm').addEventListener('submit', function (event){
        event.preventDefault(); // Empêche le rechargement de la page

        const fileParrainsInput = document.getElementById('fileParrains');

        const fileParrains = fileParrainsInput.files[0];
        // Vérifier si le fichier des parrains et sélectionné
        if(fileParrainsInput.files.length > 0){
            console.log(fileParrains.name);
        } else{
            console.log('Aucun fichier sélectionné.');
        }

        const fileFilleuls = document.getElementById('fileFilleuls').files[0];
        // Vérifier si les deux fichier son sélectionnés
        if(!fileParrains || !fileFilleuls){
            alert('Veuillez uploader les deux fichiers');
            return;
        }

        // Affichage des nom des fichiers et message de géneration

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p> Fichier es parrains: ${fileParrains.name} </p>
                               <p> Fichier des filleuls: ${fileFilleuls.name} </p>
                               <p> Génération du fichier en cours...</p>`;
        // Lire les fichiers

        Promise.all([readFile(fileParrains), readFile(fileFilleuls)])
        .then(([parrainsData, filleulsData]) =>{
            const outputData = generateOutput(parrainsData, filleulsData);
            downloadOutput(outputData);
        })
        .catch(error =>{
            console.error('Erreur lors de la lecture des fichiers:', error);
            resultDiv.innerHTML += `<p> Erreur lors de la lecture des fichiers.<p>`;
        });
    });

    function readFile(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject ('Erreur de lecture du fichier.');
            reader.readAsText(file);
        });
    }
    function generateOutput(parrainsData, filleulsData) {
        // Implimente la logique pour générer les données de sortie
        return "Données générées"
    }
    function downloadOutput(data) {
        const blob = new Blob([data], { type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.csv';
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a)
        URL.revokeObjectURL(url);
    }
