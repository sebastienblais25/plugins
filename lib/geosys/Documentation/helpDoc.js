"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpDoc = "<h1 class=\"clicksectionTitle\">Help Documentation FR</h1>\n    <div>\n        <pre>\n        Plusieurs processus sont disponibles dans ce plug-in. Les processus sont divis\u00E9s en deux sections, il a la section : Processus GeoSys et la section : Utilitaire.\n         Dans Processus GeoSys, il a les formulaires de planification, d\u2019extraction planifier, Livraison et Nettoyer qui sont des processus n\u00E9cessaires pour une zone de\n          travail. La section utilitaire contient les formulaires d\u2019extraction non planifi\u00E9e, cr\u00E9ation de m\u00E9tadonn\u00E9es, validation de m\u00E9tadonn\u00E9e, Annulation d\u2019une \u00E9tape,\n           Ajout de zone de travail sur la carte du Viewer et un explorateur de fichier.\n        -\tConnexion : Seulement entr\u00E9 un nom d\u2019usager et un mot de passe valide afin d\u2019acc\u00E9der aux fonctionnalit\u00E9s du plug-in. Lors de la connexion plusieurs informations\n         sont circuler entre l\u2019interface et l\u2019API dont les th\u00E8mes, les droits dans l\u2019application et leur \u00E9quipe. Lors de la connexion un token est pass\u00E9 avec une dur\u00E9e\n          pr\u00E9d\u00E9termin\u00E9e.\n        -\tLe menu principal :\n        -\t Permets de r\u00E9aliser toutes les \u00E9tapes pour une zone de travail. Au haut du menu principal, il a une liste d\u00E9roulante pour faire la s\u00E9lection de l\u2019environnement\n         de travail, par d\u00E9faut l\u2019environnement PRO sera toujours s\u00E9lectionn\u00E9 lors de la connexion. Lors de la s\u00E9lection des autres environnements, la couleur de fond des\n          formulaires va changer pour les environnements respectifs. Ensuite, il le bouton \u2018info user\u2019 pour avoir les informations d\u2019un compte lors de la connexion comme la\n           liste de th\u00E8me et le nom de l\u2019\u00E9quipe du compte. Et il a le bouton d\u2019aide pour afficher la liste des fonctionnalit\u00E9s.\n        -\tContient : Planifier, Extraction planifi\u00E9, Extraction sans retour, Cr\u00E9ationMD, ValidationMD, Livraison, Nettoyage, Annuler et peut-\u00EAtre un gestionnaire de fichiers.\n        \n        </pre>\n    </div>\n    <div>\n        <h2 class=\"clicksectionSection\">Processus GeoSys</h2>\n        <div>\n            <h3 class=\"clicksectionForm\">Planification</h3>\n            <div>\n                <pre>\n                -\tPremi\u00E8rement, il faut s\u00E9lectionner un th\u00E8me qui va permettre d\u2019ajouter plusieurs autres informations pour les autres champs du formulaire. La liste de\n                 th\u00E8me est une liste qui pr\u00E9d\u00E9termin\u00E9e par les th\u00E8mes associ\u00E9s avec votre compte. Il faut en s\u00E9lectionner un th\u00E8me pour obtenir les autres informations. Lors\n                  d\u2019un changement de th\u00E8me, toutes les informations vont changer pour le th\u00E8me associ\u00E9. (Required)\n                -\tEnsuite, le champ d\u2019entr\u00E9e pour un identifiant d\u2019unit\u00E9 de travail. Lors de la s\u00E9lection d\u2019un th\u00E8me. Le nom du th\u00E8me va \u00EAtre ajout\u00E9 \u00E0 la barre d\u2019entr\u00E9e \n                ainsi que la date d\u2019aujourd\u2019hui du syst\u00E8me. Il faudra compl\u00E9ter le champ afin d\u2019avoir un identifiant unique. (Required)\n                -\tLa liste des types de travail se remplit automatique lors de la s\u00E9lection d\u2019un th\u00E8me, donc il suffit d\u2019en faire la s\u00E9lection d\u2019un seul pour\n                 ce champ. (Required)\n                -\tPour les listes de classes, lors de la s\u00E9lection d\u2019un th\u00E8me, toutes les classes associ\u00E9es avec un th\u00E8me. Seulement trois classes sont affich\u00E9es dans la\n                 petite fen\u00EAtre \u00E0 la fois, donc il suffit d\u2019utiliser la barre d\u00E9roulante pour avoir un acc\u00E8s aux restants des classes. En haut de la bo\u00EEte de la s\u00E9lection,\n                  il a une case \u00E0 cocher qui sert \u00E0 faire une s\u00E9lection totale ou tout d\u00E9s\u00E9lectionner. (Required)\n                -\tPour la date de fin pr\u00E9vue, il faut ajouter la date que vous pr\u00E9voyez la fin d\u2019utilisation des donn\u00E9es. En cliquant sur l\u2019ic\u00F4ne de calendrier ou la \n                fl\u00E8che un calendrier va apparaitre afin de faire une s\u00E9lection d\u2019une date ou il est possible d\u2019entrer la date \u00E0 main dans le format MM/JJ/AAAA. (Optionnal)\n                -\tLe Where Clause est un champ facultatif pour entrer une condition lors de votre s\u00E9lection de donn\u00E9es dans la base de donn\u00E9es. (Optionnal)\n                \n                G\u00E9om\u00E9trie: trois fa\u00E7ons d\u2019entrer une g\u00E9om\u00E9trie\n                -\tPremi\u00E8re option : Entrer un Geojson qui contient ce format dans le champ :\n                -\tDeuxi\u00E8me option : Dessiner une g\u00E9om\u00E9trie avec la barre d\u2019outils en bas \u00E0 droite qui va remplir le champ de g\u00E9om\u00E9trie avec un Geojson .\n                -\tTroisi\u00E8me option : Importer un fichier shapefile zipper. Pour importer un Shapefile zipper, il faut qu\u2019il ait au minimum le .shp et le .prj .\n                 Lors de l\u2019importation du Shapefile, le polygone est dessin\u00E9 sur le Viewer afin de pouvoir visualiser la zone de travail entr\u00E9e. Lorsqu\u2019un polygone\n                  est dessin\u00E9, un zoom est effectu\u00E9 dessus dans le Viewer et le Geojson est entr\u00E9 dans le champ de g\u00E9om\u00E9trie.\n                \n                \n                -\tLorsque le formulaire est complet, vous pouvez cliquer sur soumettre pour envoyer les informations \u00E0 la base de donn\u00E9es\n                \n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Extraction</h3>\n            <div>\n                <pre>\n                -\tPremi\u00E8rement, il faut faire une s\u00E9lection de th\u00E8mes qui associer avec les th\u00E8mes de votre compte. Il est important de faire la s\u00E9lection du th\u00E8me en\n                 premier afin que la liste des identifiants d\u2019unit\u00E9 de travail soit peupl\u00E9e. (Required)\n                -\tPour avoir une extraction planifi\u00E9e r\u00E9ussie, il faut qu\u2019un identifiant d\u2019unit\u00E9 de travail soit s\u00E9lectionn\u00E9, car cet identifiant est plac\u00E9 au bout du\n                 lien hyper texte. (Required)\n                -\tPour cette fonctionnalit\u00E9, il a une option d\u2019option avanc\u00E9e qui permet de s\u00E9lectionner un deuxi\u00E8me environnement afin de pouvoir effectuer des astuces\n                 sur deux environnements diff\u00E9rents lors d\u2019une extraction planifi\u00E9e. (Optionnal)\n                -\tLorsque les deux champs sont complets, il suffit de cliquer sur le bouton soumettre afin d\u2019avoir une extraction planifi\u00E9e.\n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Livraison</h3>\n            <div>\n                <pre>\n                -\tPremi\u00E8rement, la s\u00E9lection de l\u2019op\u00E9ration afin de savoir s\u2019il s\u2019agit d\u2019une insertion ou d\u2019une mise \u00E0 jour. Il n\u2019a pas d\u2019\u00E9l\u00E9ment s\u00E9lectionn\u00E9 par\n                 d\u00E9faut afin qu\u2019une op\u00E9ration soit r\u00E9alis\u00E9e sans en avoir choisi une pr\u00E9alablement. (Required)\n                -\tEnsuite, la s\u00E9lection du th\u00E8me que la livraison est r\u00E9aliser pour peupler la liste des identifiants des unit\u00E9s de travail. (Required)\n                -\tIl faut s\u00E9lectionner un identifiant d\u2019unit\u00E9 de travail pour effectuer la livraison au bon endroit. (Required)\n                -\tPour le prochain champ, il faut ajouter le fichier des m\u00E9tadonn\u00E9es reli\u00E9es avec votre fichier FGDB. (Required)\n                -\tIl faut ajouter le fichier FGDB qui contient les changements apport\u00E9s. Pour cette fonctionnalit\u00E9, il a une option d\u2019option avanc\u00E9e qui permet de\n                 s\u00E9lectionner un deuxi\u00E8me environnement afin de pouvoir effectuer des astuces sur deux environnements diff\u00E9rents lors d\u2019une extraction planifi\u00E9e. (Optionnal)\n                -\tEnsuite, cliquez sur le bouton soumettre pour envoyer votre formulaire.\n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Nettoyer</h3>\n            <div>\n                <pre>\n                -\tPremi\u00E8rement, il faut faire une s\u00E9lection de th\u00E8mes qui associer avec les th\u00E8mes de votre compte. Il est important de faire la s\u00E9lection du th\u00E8me en\n                 premier afin que la liste des identifiants d\u2019unit\u00E9 de travail soit peupl\u00E9e. (Required)\n                -\tPour avoir un nettoyage r\u00E9ussi, il faut qu\u2019un identifiant d\u2019unit\u00E9 de travail soit s\u00E9lectionn\u00E9, car cet identifiant est plac\u00E9 au bout du\n                 lien hypertexte. (Required)\n                -\tLorsque les deux champs sont complets, il suffit de cliquer sur le bouton soumettre afin d\u2019avoir un nettoyage.\n                </pre>\n            </div>\n        </div>\n        <h2 class=\"clicksectionSection\">Utilitaire</h2>\n        <div>\n            <h3 class=\"clicksectionForm\">Extraction</h3>\n            <div>\n                <pre>\n                -\tPremi\u00E8rement, il faut s\u00E9lectionner un th\u00E8me qui est associ\u00E9 au compte de l\u2019utilisateur pour avoir un acc\u00E8s \u00E0 une liste de classe lors\n                 de l\u2019extraction. (Required)\n                -\tLa s\u00E9lection de classe est r\u00E9alis\u00E9e par des cases \u00E0 cocher des classes disponibles pour le th\u00E8me s\u00E9lectionn\u00E9. Seulement les cases coch\u00E9es seront\n                 envoy\u00E9es. La case \u00E0 cocher au-dessus de la liste de classe permet de s\u00E9lectionner toutes les options ou de d\u00E9s\u00E9lectionner toutes les options qui ont\n                  \u00E9t\u00E9 s\u00E9lectionn\u00E9es auparavant. (Required)\n                -\tPour le si clip, Cette fonctionnalit\u00E9 sert \u00E0 faire clip sur les feuillets ou non, donc si vous avez une s\u00E9lection sur deux feuillets, le clip sert\n                 si vous voulez la totalit\u00E9 des deux feuillets ou seulement les parties s\u00E9lectionn\u00E9es. (Optionnal)\n                -\tLe Where Clause est un champ facultatif pour entrer une condition lors de votre s\u00E9lection de donn\u00E9es dans la base de donn\u00E9es. (Optionnal)\n                -\tLe champ pour la g\u00E9om\u00E9trie est la m\u00EAme que celui \u00E0 la planification. La g\u00E9om\u00E9trie de votre zone de travail qui peut \u00EAtre s\u00E9lectionn\u00E9 de trois fa\u00E7ons.\n                 La premi\u00E8re est d\u2019entrer une g\u00E9om\u00E9trie dans le format geoJSON. Ensuite, vous pouvez effectuer un dessin sur la carte \u00E0 l\u2019aide du plug-in de dessins\n                  ajouter avec ces plug-ins. La derni\u00E8re d\u2019importer votre fichier shapefile zipper et ensuite cliquer sur le bouton \u2018ajout SHP\u2019. Ensuite, il a le bouton\n                   copier qui permet de faire un copier-coller du champ g\u00E9om\u00E9trie. (Required)\n                -\tPour cette fonctionnalit\u00E9, il a une option d\u2019option avanc\u00E9e qui permet de s\u00E9lectionner un deuxi\u00E8me environnement afin de pouvoir effectuer des astuces\n                 sur deux environnements diff\u00E9rents lors d\u2019une extraction planifi\u00E9e. (Optionnal)\n                -\tEnsuite, cliquez sur le bouton soumettre pour envoyer votre formulaire \u00E0 l\u2019API.\n\n                G\u00E9om\u00E9trie: trois fa\u00E7ons d\u2019entrer une g\u00E9om\u00E9trie\n                -\tPremi\u00E8re option : Entrer un Geojson qui contient ce format dans le champ :\n                -\tDeuxi\u00E8me option : Dessiner une g\u00E9om\u00E9trie avec la barre d\u2019outils en bas \u00E0 droite qui va remplir le champ de g\u00E9om\u00E9trie avec un Geojson .\n                -\tTroisi\u00E8me option : Importer un fichier shapefile zipper. Pour importer un Shapefile zipper, il faut qu\u2019il ait au minimum le .shp et le .prj .\n                 Lors de l\u2019importation du Shapefile, le polygone est dessin\u00E9 sur le Viewer afin de pouvoir visualiser la zone de travail entr\u00E9e. Lorsqu\u2019un polygone\n                  est dessin\u00E9, un zoom est effectu\u00E9 dessus dans le Viewer et le Geojson est entr\u00E9 dans le champ de g\u00E9om\u00E9trie.\n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Cr\u00E9ation M\u00E9tadonn\u00E9e</h3>\n            <div>\n                <pre>\n                    En Progr\u00E8s ...\n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Validation M\u00E9tadonn\u00E9e</h3>\n            <div>\n                <pre>\n                    En Progr\u00E8s ...\n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Annuler</h3>\n            <div>\n                <pre>\n                    En Progr\u00E8s ...\n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Requ\u00EAte \u00E0 la base de donn\u00E9e</h3>\n            <div>\n                <pre>\n                    Dans ce formulaire, il a une zone de texte qui permet d\u2019envoyer des requ\u00EAtes \u00E0 l\u2019API pour pouvoir afficher des zones de travaux sur le Viewer.\n                     Dans cette zone de texte, les drop, update, alter, insert sont bloqu\u00E9s, car il a seulement les requ\u00EAtes avec des \u00AB Select \u00BB sont accept\u00E9s pour \n                     ressortir des zones de travails. Ensuite, il a le bouton afin d\u2019envoyer votre requ\u00EAte \u00E0 l\u2019API afin de recevoir le Geojson pour la zone de travail\n                      d\u00E9sir\u00E9.\n                </pre>\n            </div>\n            <h3 class=\"clicksectionForm\">Explorateur de fichier</h3>\n            <div>\n                <pre>\n                L\u2019explorateur de fichier permet de voir les fichiers et r\u00E9pertoires des ressources d\u2019une \u00E9quipe et selon le th\u00E8me de votre compte. Lors d\u2019un clic du\n                 bouton de l\u2019explorateur de fichier dans le menu principal du plug-in de Geosys. \n                Pour la navigation, il a un bouton pr\u00E9c\u00E9dent qui permet de retourner en arri\u00E8re d\u2019un r\u00E9pertoire, il a un bouton pour rafraichir un r\u00E9pertoire lorsqu\u2019il\n                 a changement. Ensuite, il a une barre pour afficher le chemin de r\u00E9pertoire jusqu\u2019au fichier o\u00F9 l\u2019utilisateur est rendu dans la navigation et chacun \n                 des noms est cliquable pour retrouver dans ce r\u00E9pertoire. Cet ent\u00EAte est attach\u00E9 en haut de cette fen\u00EAtre, donc si la liste de fichier est trop grande\n                  l\u2019ent\u00EAte va toujours \u00EAtre en haut de ce panneau.\n                Cet explorateur de fichier permet d\u2019afficher les fichiers et les dossiers d\u2019un r\u00E9pertoire. Pour les informations d\u2019un fichier, il a le nom du fichier,\n                 la derni\u00E8re date de modification et la grosseur du fichier. Il est possible de t\u00E9l\u00E9charger en cliquant sur l\u2019ic\u00F4ne de fl\u00E8che visant vers le bas et de\n                  supprimer un fichier en cliquant sur l\u2019ic\u00F4ne qui ressemble \u00E0 une poubelle.\n                Pour les dossiers, il leur nom et la date de modification et la seule option est de pouvoir cliquer sur le dossier afin d\u2019entrer dans ce r\u00E9pertoire.                \n                </pre>\n            </div>\n        </div>\n    </div>";