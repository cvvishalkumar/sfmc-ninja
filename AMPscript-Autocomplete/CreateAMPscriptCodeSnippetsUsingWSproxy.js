<script runat='server' language='javascript'>
Platform.Load("Core", "1.1.5");
var prox = new Script.Util.WSProxy();

try {
/* Getting FolderID of ParentFolder [Content Builder] */
var cols = [ "Name","ContentType","ID","CustomerKey"];
var filter = {
    Property: "Name",
    SimpleOperator: "equals",
    Value: "Content Builder"
};
var data = prox.retrieve("DataFolder", cols, filter);

var config = {
  "Name": "SFMCninja",
  "Description": "This folder contains all the AMPscript autocomplete snippets",
  "ParentFolder": {
      ID : Stringify(data.Results[0].ID),
      IDSpecified: true
  },
  "ContentType": "asset"
}; 

// Create Folder to store Code snippet blocks    
var createResult = prox.createItem("DataFolder", config);
if(createResult)
{
  Write("Successfully created folder --> <strong>Content Builder/SFMCninja</strong><br>");
}
else {
Write("Someting went wrong!!!")
}



/* Getting Folder ID of SFMCninja */
var cols = [ "Name","ContentType","ID","CustomerKey"];
var filter = {
    Property: "Name",
    SimpleOperator: "equals",
    Value: "SFMCninja"
};
var data = prox.retrieve("DataFolder", cols, filter);
var SFMCninja_FID = Stringify(data.Results[0].ID);
var Asset_ID = 220; //Asset type = codesnippetblock

/* 001 - HiddenBlock */
var results = prox.createItem("Asset", {
  "Name": "HiddenBlock",
  "CustomerKey" : "HiddenBlock",
  "AssetType": {Id: Asset_ID },
  "Category": {Id: SFMCninja_FID}, 
  "Content": "\n<div style='display:none'>\n%%[\t// your AMPscript/SSJS code \n]%%\n</div>\n"
});
Write("Successfully created --> <strong>Content Builder/SFMCninja/HiddenBlock</strong> <br>");

  /* 002 - Lookup */
var results = prox.createItem("Asset", {
  "Name": "Lookup",
  "CustomerKey" : "Lookup",
  "AssetType": {Id: Asset_ID},
  "Category": {Id: SFMCninja_FID},
  "Content": "%%[\n\tSET @Lookup_DE = 'Your_Lookup_DE_Name'\n\tSET @returnedField = 'City'\n\tSET @whereField = 'PostalCode'\n\tSET @whereValue = '570021'\n\tSET @fieldValue = Lookup(@Lookup_DE, @returnedField, @whereField, @whereValue)\n]%%"
});
Write("Successfully created --> <strong>Content Builder/SFMCninja/Lookup</strong> <br>");

  /* 003 - RedirectTo */
var results = prox.createItem("Asset", {
  "Name": "RedirectTo",
  "CustomerKey" : "RedirectTo",
  "AssetType": {Id: Asset_ID},
  "Category": {Id: SFMCninja_FID},
  "Content": "\n%%[\n\tSET @lang = 'en'\n\tSET @url = CONCAT('https://example.com/home.html?lang=', @lang)\n]%%\n\n<a href='%%=RedirectTo(@url)=%%'>Visit HOME page</a>\n"
});
Write("Successfully created --> <strong>Content Builder/SFMCninja/RedirectTo</strong> <br>");


/* 004 - LookupRows */
var results = prox.createItem("Asset", {
  "Name": "LookupRows",
  "CustomerKey" : "LookupRows",
  "AssetType": {Id: Asset_ID},
  "Category": {Id: SFMCninja_FID},
  "Content": "\n%%[\n\tSET @rows = LookupRows('StoresDE', 'StoreID',AttributeValue('StoreID'))\n\n\tFOR @i = 1 TO /*DOWNTO*/ RowCount(@rows) DO\n\tSET @row = Row(@rows, @i)\n\tSET @StoreName = Field(@row,'StoreName')\n\tSET @StoreAddress = Field(@row,'StoreAddress')\nNEXT @i\n]%%\n"
});
Write("Successfully created --> <strong>Content Builder/SFMCninja/LookupRows</strong> <br>");


/* 005 - Dynamic_Content_Blocks  */

  var results = prox.createItem("Asset", {
  "Name": "Dynamic_Content_Blocks",
  "CustomerKey" : "Dynamic_Content_Blocks",
  "AssetType": {Id: Asset_ID},
  "Category": {Id: SFMCninja_FID},
  "Content": "\n%%[IF (Condition) THEN]%%\nContentBlockByName('Content Builder\Weekly Portfolio')\n%%[ELSEIF (Other_Condition) THEN]%%\nContentBlockbyKey('myContentBlock')\n%%[ELSEIF (Some_Other_Condition) THEN]%%\n<_your_costom_html_block>\n%%[ENDIF]%%\n"
});
Write("Successfully created --> <strong>Content Builder/SFMCninja/Dynamic_Content_Blocks</strong> <br>"); 


/* 000 - xxx 

  var results = prox.createItem("Asset", {
  "Name": "xxx",
  "CustomerKey" : "xxx",
  "AssetType": {Id: Asset_ID},
  "Category": {Id: SFMCninja_FID},
  "Content": "Your AMPscript snippet here"
});
Write("Successfully created --> <strong>Content Builder/SFMCninja/xxx</strong> <br>"); 

*/





} /* try */
catch (e) {
  Write("<br>AMPscript Error Message: " + e);
}
 </script>
