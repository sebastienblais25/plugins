
export const helpDoc:string = `<h1 class="clicksectionTitle">Help Documentation FR</h1>
    <div>
        <pre>
        Plusieurs processus sont disponibles dans ce plug-in. Les processus sont divisés en deux sections, il a la section : Processus GeoSys et la section : Utilitaire.
         Dans Processus GeoSys, il a les formulaires de planification, d’extraction planifier, Livraison et Nettoyer qui sont des processus nécessaires pour une zone de
          travail. La section utilitaire contient les formulaires d’extraction non planifiée, création de métadonnées, validation de métadonnée, Annulation d’une étape,
           Ajout de zone de travail sur la carte du Viewer et un explorateur de fichier.
        -	Connexion : Seulement entré un nom d’usager et un mot de passe valide afin d’accéder aux fonctionnalités du plug-in. Lors de la connexion plusieurs informations
         sont circuler entre l’interface et l’API dont les thèmes, les droits dans l’application et leur équipe. Lors de la connexion un token est passé avec une durée
          prédéterminée.
        -	Le menu principal :
        -	 Permets de réaliser toutes les étapes pour une zone de travail. Au haut du menu principal, il a une liste déroulante pour faire la sélection de l’environnement
         de travail, par défaut l’environnement PRO sera toujours sélectionné lors de la connexion. Lors de la sélection des autres environnements, la couleur de fond des
          formulaires va changer pour les environnements respectifs. Ensuite, il le bouton ‘info user’ pour avoir les informations d’un compte lors de la connexion comme la
           liste de thème et le nom de l’équipe du compte. Et il a le bouton d’aide pour afficher la liste des fonctionnalités.
        -	Contient : Planifier, Extraction planifié, Extraction sans retour, CréationMD, ValidationMD, Livraison, Nettoyage, Annuler et peut-être un gestionnaire de fichiers.
        
        </pre>
    </div>
    <div>
        <h2 class="clicksectionSection">Processus GeoSys</h2>
        <div>
            <h3 class="clicksectionForm">Planification</h3>
            <div>
                <pre>
                -	Premièrement, il faut sélectionner un thème qui va permettre d’ajouter plusieurs autres informations pour les autres champs du formulaire. La liste de
                 thème est une liste qui prédéterminée par les thèmes associés avec votre compte. Il faut en sélectionner un thème pour obtenir les autres informations. Lors
                  d’un changement de thème, toutes les informations vont changer pour le thème associé. (Required)
                -	Ensuite, le champ d’entrée pour un identifiant d’unité de travail. Lors de la sélection d’un thème. Le nom du thème va être ajouté à la barre d’entrée 
                ainsi que la date d’aujourd’hui du système. Il faudra compléter le champ afin d’avoir un identifiant unique. (Required)
                -	La liste des types de travail se remplit automatique lors de la sélection d’un thème, donc il suffit d’en faire la sélection d’un seul pour
                 ce champ. (Required)
                -	Pour les listes de classes, lors de la sélection d’un thème, toutes les classes associées avec un thème. Seulement trois classes sont affichées dans la
                 petite fenêtre à la fois, donc il suffit d’utiliser la barre déroulante pour avoir un accès aux restants des classes. En haut de la boîte de la sélection,
                  il a une case à cocher qui sert à faire une sélection totale ou tout désélectionner. (Required)
                -	Pour la date de fin prévue, il faut ajouter la date que vous prévoyez la fin d’utilisation des données. En cliquant sur l’icône de calendrier ou la 
                flèche un calendrier va apparaitre afin de faire une sélection d’une date ou il est possible d’entrer la date à main dans le format MM/JJ/AAAA. (Optionnal)
                -	Le Where Clause est un champ facultatif pour entrer une condition lors de votre sélection de données dans la base de données. (Optionnal)
                
                Géométrie: trois façons d’entrer une géométrie
                -	Première option : Entrer un Geojson qui contient ce format dans le champ :
                -	Deuxième option : Dessiner une géométrie avec la barre d’outils en bas à droite qui va remplir le champ de géométrie avec un Geojson .
                -	Troisième option : Importer un fichier shapefile zipper. Pour importer un Shapefile zipper, il faut qu’il ait au minimum le .shp et le .prj .
                 Lors de l’importation du Shapefile, le polygone est dessiné sur le Viewer afin de pouvoir visualiser la zone de travail entrée. Lorsqu’un polygone
                  est dessiné, un zoom est effectué dessus dans le Viewer et le Geojson est entré dans le champ de géométrie.
                
                
                -	Lorsque le formulaire est complet, vous pouvez cliquer sur soumettre pour envoyer les informations à la base de données
                
                </pre>
            </div>
            <h3 class="clicksectionForm">Extraction</h3>
            <div>
                <pre>
                -	Premièrement, il faut faire une sélection de thèmes qui associer avec les thèmes de votre compte. Il est important de faire la sélection du thème en
                 premier afin que la liste des identifiants d’unité de travail soit peuplée. (Required)
                -	Pour avoir une extraction planifiée réussie, il faut qu’un identifiant d’unité de travail soit sélectionné, car cet identifiant est placé au bout du
                 lien hyper texte. (Required)
                -	Pour cette fonctionnalité, il a une option d’option avancée qui permet de sélectionner un deuxième environnement afin de pouvoir effectuer des astuces
                 sur deux environnements différents lors d’une extraction planifiée. (Optionnal)
                -	Lorsque les deux champs sont complets, il suffit de cliquer sur le bouton soumettre afin d’avoir une extraction planifiée.
                </pre>
            </div>
            <h3 class="clicksectionForm">Livraison</h3>
            <div>
                <pre>
                -	Premièrement, la sélection de l’opération afin de savoir s’il s’agit d’une insertion ou d’une mise à jour. Il n’a pas d’élément sélectionné par
                 défaut afin qu’une opération soit réalisée sans en avoir choisi une préalablement. (Required)
                -	Ensuite, la sélection du thème que la livraison est réaliser pour peupler la liste des identifiants des unités de travail. (Required)
                -	Il faut sélectionner un identifiant d’unité de travail pour effectuer la livraison au bon endroit. (Required)
                -	Pour le prochain champ, il faut ajouter le fichier des métadonnées reliées avec votre fichier FGDB. (Required)
                -	Il faut ajouter le fichier FGDB qui contient les changements apportés. Pour cette fonctionnalité, il a une option d’option avancée qui permet de
                 sélectionner un deuxième environnement afin de pouvoir effectuer des astuces sur deux environnements différents lors d’une extraction planifiée. (Optionnal)
                -	Ensuite, cliquez sur le bouton soumettre pour envoyer votre formulaire.
                </pre>
            </div>
            <h3 class="clicksectionForm">Nettoyer</h3>
            <div>
                <pre>
                -	Premièrement, il faut faire une sélection de thèmes qui associer avec les thèmes de votre compte. Il est important de faire la sélection du thème en
                 premier afin que la liste des identifiants d’unité de travail soit peuplée. (Required)
                -	Pour avoir un nettoyage réussi, il faut qu’un identifiant d’unité de travail soit sélectionné, car cet identifiant est placé au bout du
                 lien hypertexte. (Required)
                -	Lorsque les deux champs sont complets, il suffit de cliquer sur le bouton soumettre afin d’avoir un nettoyage.
                </pre>
            </div>
        </div>
        <h2 class="clicksectionSection">Utilitaire</h2>
        <div>
            <h3 class="clicksectionForm">Extraction</h3>
            <div>
                <pre>
                -	Premièrement, il faut sélectionner un thème qui est associé au compte de l’utilisateur pour avoir un accès à une liste de classe lors
                 de l’extraction. (Required)
                -	La sélection de classe est réalisée par des cases à cocher des classes disponibles pour le thème sélectionné. Seulement les cases cochées seront
                 envoyées. La case à cocher au-dessus de la liste de classe permet de sélectionner toutes les options ou de désélectionner toutes les options qui ont
                  été sélectionnées auparavant. (Required)
                -	Pour le si clip, Cette fonctionnalité sert à faire clip sur les feuillets ou non, donc si vous avez une sélection sur deux feuillets, le clip sert
                 si vous voulez la totalité des deux feuillets ou seulement les parties sélectionnées. (Optionnal)
                -	Le Where Clause est un champ facultatif pour entrer une condition lors de votre sélection de données dans la base de données. (Optionnal)
                -	Le champ pour la géométrie est la même que celui à la planification. La géométrie de votre zone de travail qui peut être sélectionné de trois façons.
                 La première est d’entrer une géométrie dans le format geoJSON. Ensuite, vous pouvez effectuer un dessin sur la carte à l’aide du plug-in de dessins
                  ajouter avec ces plug-ins. La dernière d’importer votre fichier shapefile zipper et ensuite cliquer sur le bouton ‘ajout SHP’. Ensuite, il a le bouton
                   copier qui permet de faire un copier-coller du champ géométrie. (Required)
                -	Pour cette fonctionnalité, il a une option d’option avancée qui permet de sélectionner un deuxième environnement afin de pouvoir effectuer des astuces
                 sur deux environnements différents lors d’une extraction planifiée. (Optionnal)
                -	Ensuite, cliquez sur le bouton soumettre pour envoyer votre formulaire à l’API.

                Géométrie: trois façons d’entrer une géométrie
                -	Première option : Entrer un Geojson qui contient ce format dans le champ :
                -	Deuxième option : Dessiner une géométrie avec la barre d’outils en bas à droite qui va remplir le champ de géométrie avec un Geojson .
                -	Troisième option : Importer un fichier shapefile zipper. Pour importer un Shapefile zipper, il faut qu’il ait au minimum le .shp et le .prj .
                 Lors de l’importation du Shapefile, le polygone est dessiné sur le Viewer afin de pouvoir visualiser la zone de travail entrée. Lorsqu’un polygone
                  est dessiné, un zoom est effectué dessus dans le Viewer et le Geojson est entré dans le champ de géométrie.
                </pre>
            </div>
            <h3 class="clicksectionForm">Création Métadonnée</h3>
            <div>
                <pre>
                    En Progrès ...
                </pre>
            </div>
            <h3 class="clicksectionForm">Validation Métadonnée</h3>
            <div>
                <pre>
                    En Progrès ...
                </pre>
            </div>
            <h3 class="clicksectionForm">Annuler</h3>
            <div>
                <pre>
                    En Progrès ...
                </pre>
            </div>
            <h3 class="clicksectionForm">Requête à la base de donnée</h3>
            <div>
                <pre>
                    Dans ce formulaire, il a une zone de texte qui permet d’envoyer des requêtes à l’API pour pouvoir afficher des zones de travaux sur le Viewer.
                     Dans cette zone de texte, les drop, update, alter, insert sont bloqués, car il a seulement les requêtes avec des « Select » sont acceptés pour 
                     ressortir des zones de travails. Ensuite, il a le bouton afin d’envoyer votre requête à l’API afin de recevoir le Geojson pour la zone de travail
                      désiré.
                </pre>
            </div>
            <h3 class="clicksectionForm">Explorateur de fichier</h3>
            <div>
                <pre>
                L’explorateur de fichier permet de voir les fichiers et répertoires des ressources d’une équipe et selon le thème de votre compte. Lors d’un clic du
                 bouton de l’explorateur de fichier dans le menu principal du plug-in de Geosys. 
                Pour la navigation, il a un bouton précédent qui permet de retourner en arrière d’un répertoire, il a un bouton pour rafraichir un répertoire lorsqu’il
                 a changement. Ensuite, il a une barre pour afficher le chemin de répertoire jusqu’au fichier où l’utilisateur est rendu dans la navigation et chacun 
                 des noms est cliquable pour retrouver dans ce répertoire. Cet entête est attaché en haut de cette fenêtre, donc si la liste de fichier est trop grande
                  l’entête va toujours être en haut de ce panneau.
                Cet explorateur de fichier permet d’afficher les fichiers et les dossiers d’un répertoire. Pour les informations d’un fichier, il a le nom du fichier,
                 la dernière date de modification et la grosseur du fichier. Il est possible de télécharger en cliquant sur l’icône de flèche visant vers le bas et de
                  supprimer un fichier en cliquant sur l’icône qui ressemble à une poubelle.
                Pour les dossiers, il leur nom et la date de modification et la seule option est de pouvoir cliquer sur le dossier afin d’entrer dans ce répertoire.                
                </pre>
            </div>
        </div>
    </div>`
