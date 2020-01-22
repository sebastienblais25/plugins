


export const form:string = `<div tabindex="-2"><ul class="rv-list">
<li>
<form id="form" method="POST">
  Environnement:<br>
  <input type="text" name="env" id="env" value="Pro">
  <br>
  Sélectionner le thème:<br>
  <input type="text" name="theme" id="theme" value="Hydro">
  <br>
  Sélectionner la source de la zone de travail:<br>
  <input type="text" name="ZT" value="1">
  <br>
  Sélectionner le type de travail:<br>
  <input type="text" name="TT" value="Ajout">
  <br>
  Date de fin prévue:<br>
  <input type="date" name="datefin" value="">
  <br><br>
  <button type="submit" id="submit" value="Submit" onclick="submitForm();">Submit</button>
</form> 
</li>
</ul></div>`;
