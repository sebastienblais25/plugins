# Explorateur de fichier

## Quoi il fait

Ce plugin permet d'afficher l'intérieur d'un répertoire dans le viewer de la PGF. Dans ce plugin, il contient les fonctionnalité de bases pour un explorateur de fichier sur le web. il permet la navigation entre dossier, la création de dossier, le téléchargement de fichiers et de dossiers, la suppression de fichiers et de dossers et téléverser un fichier. Plusieurs fichier à la fois n'est pas supporter.

## Comment il fonctionne

Pour le fonctionnement de ce plugin, il faut un API qui permet d'envoyer la liste de fichier et de dossier dans un répertoire et d'avoir des appels pour toutes les opérations disponibles.

## Ajout dans le code pour fonctionnement
Pour le setUrl(...) le premier paramètre est la config si vous avez mis les informations, ensuite il s'agit de l'adresse du serveur avec toutes les fins d'url pour effectuer 
chacune des opérations.

La construction de ppanel se fait à l'extérieur du plugin pour garder en mémoire ou vous étiez rendu dans la naviagtion et permet d'ouvrir et fermer le plugins plusieurs fois.

```
let tfm: FileMana = new FileMana();
tfm.setUrl(config, urlServeur, urlListFileFolder, urlFolderAction, urlFileAction, urlFileActionUpload);
//permet d'afficher ou chacher le formulaire en cliquant sur le titre
this.OpenFileManager = () => {
    // Check if an environnment is selected
    if (log.getEnvironnementSel() !== '') {
        if (!this.panel) {
            // make sure both header and body have a digest cycle run on them
            this.panel = mapApi.panels.create('FileManager');
            //Size of the panel
            this.panel.element.css( {top: '0px;', margin: '100px 50px 100px 450px'} );
            //button in the header of the panel
            this.panel.header.toggleButton;
            this.panel.header.closeButton;
            this.panel1 = mapApi.panels.create('AddFolder');
            this.panel1.element.css({
                bottom: '0em',
                width: '300px',
                height: '200px'
            });
            this.panel1.element.css({top: '0px;', margin: '200px 50px 100px 650px'});
            this.panel1.header.closeButton;
            this.panel1.header.title = `Add Folder`;
        } else {
            this.panel.close();
            this.panel1.close();
        }
        // Create the interface for the file manager
        let mainFile: FileManagerController = new FileManagerController()
        mainFile.fileManagercontrols(log.getToken(), mapApi, tfm, this.panel, this.panel1);
    }
};
```

## Navigation
Entrer dans les répertoire , retrouner dans le dossier précédent choisir parmi tous les dossiers antérieur, rafraichir le dossier.

## Opération

### Upload fichier 
Le upload en drag and drop est supporté 
### Download fichier
le download des fichiers sur le serveur
### Delete fichier et dossier
Le fichier peut être supprimer du serveur

## Code

### FileMana.ts

Ce fichier contient toutes les fonctions du plugins.
Il a les templates pour construire l'interface du plugin