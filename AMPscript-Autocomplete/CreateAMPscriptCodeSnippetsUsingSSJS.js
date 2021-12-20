<script runat="server">
// CREATE HTML CONTENT BLOCK VIA SSJS
Platform.Load("Core","1");

try {
Write("start</br>");

var asset = Platform.Function.CreateObject("Asset");

//Set AssetType (complex property)
var nameIdReference = Platform.Function.CreateObject("NameIdReference");
Platform.Function.SetObjectProperty(nameIdReference, "Id", 220); //CodeSnippet block type
Platform.Function.SetObjectProperty(asset, "AssetType", nameIdReference);

//Set Category (complex property) - aka Folder
var categoryNameIdReference = Platform.Function.CreateObject("CategoryNameIdReference");
Platform.Function.SetObjectProperty(categoryNameIdReference, "Id", 54019); //Folder ID [inspect in browser for [data-id]
Platform.Function.SetObjectProperty(asset, "Category", categoryNameIdReference);



//Set Name, CustomerKey, Content, and ContentType (simple text properties)

/* 01_Lookup || V_Lookup */
Platform.Function.SetObjectProperty(asset, "Name", "V_Lookup");
Platform.Function.SetObjectProperty(asset, "CustomerKey", "V_Lookup");
Platform.Function.SetObjectProperty(asset, "Content", "%%[\n\tSET @Lookup_DE = 'Your_Lookup_DE_Name'\n\tSET @returnedField = 'City'\n\tSET @whereField = 'PostalCode'\n\tSET @whereValue = '570021'\n\tSET @fieldValue = Lookup(@Lookup_DE, @returnedField, @whereField, @whereValue)\n]%%");
Platform.Function.SetObjectProperty(asset, "ContentType", "text/html");
var response = Platform.Function.InvokeCreate(asset, statusAndRequest, null);
Write(response.toString() + " - Created script <strong>V_Lookup</strong></br>");










Write("end</br>");

} catch (err) {
Write(Stringify(err) + "</br>");
}
</script>
