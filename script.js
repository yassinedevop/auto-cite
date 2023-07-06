/*
ce script remplace les liens dans votre document sur google docs
par des citations
*/
function myFunction() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var paragraphs = body.getParagraphs();
  var j = 0;

  for(var i = paragraphs.length - 75
  /*
  à remplacer par l'index du premier lien
  par exemple pour moi j'ai les liens à la fin du document
  et j'ai 75 liens pour cela j'ai indexé i sur le dernier paragraphe - 75
*/
 ; i < paragraphs.length ; i++){
    j++;
    var text = paragraphs[i].getText();
    var link = text.split(" ");
    link[1] = link[1].slice(0, link[1].length-1); 
    try{
    body.appendParagraph("[" +j.toString()+ "]"+genererCitationAPartirDuLien(link[1]));
    }
    catch(e)
    {
      body.appendParagraph("[" +j.toString()+ "]"+"Livre ......");
    }
  }
}
function genererCitationAPartirDuLien(lienUrl) {
  var citation = ""; // Placeholder pour la citation
  
  // Personnalisez la logique de génération de citation selon vos besoins
  // Vous pouvez analyser l'URL du lien ou récupérer des informations à partir de sources externes
  
  // Exemple de format de citation : [Titre de la page Web]. Récupéré depuis [URL]
  citation = "[" + getTitreDuLien(lienUrl) + "]. consulté à 21/04/2023 depuis le lien\n" + lienUrl +" ";

  return citation;
}

function getTitreDuLien(lienUrl) {
  var response = UrlFetchApp.fetch(lienUrl);
  var contenu = response.getContentText();
  var regexTitre = /<title>(.*?)<\/title>/;
  var correspondanceTitre = contenu.match(regexTitre);
  var titre = correspondanceTitre && correspondanceTitre[1] ? correspondanceTitre[1] : "Sans titre";

  return titre;
}
