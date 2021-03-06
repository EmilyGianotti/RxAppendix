function setup() {
    noCanvas();
    

    let bgpage = chrome.extension.getBackgroundPage();
    drug_input = bgpage.drug;

    let url_1 = 'https://api.fda.gov/drug/event.json?search=(receivedate:[20040101+TO+20210918])+AND+'; 
    let url = url_1 + drug_input.trim() + '&count=patient.drug.drugindication.exact';
    
    loadJSON(url, gotData);
    

    function gotData(data) {
        var drug_uses = "";
        var indx = 0;
        var counter = 0;

        while (counter < 5 && indx < data.results.length){
            value = data.results[indx].term;
            if (value != "PRODUCT USED FOR UNKNOWN INDICATION" &&
            value != "DRUG USE FOR UNKNOWN INDICATION"){
                if (counter < 4)
                    drug_uses += (value + ", ");
                else
                    drug_uses += value
                drug_uses += "\n";
                counter++;
            }
            indx++;
        }

        createP(drug_uses);
    }
    createP("Drug: " + drug_input).style("font-size", "15pt")
    def = "The drug is used for:";
    createP(def);
    
}