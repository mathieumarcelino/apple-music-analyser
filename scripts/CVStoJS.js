    
// Convert a csv file to a JavaScript table
    
    let finalTable=[];

    $('#viewfile').click(function () {

      let readTable = new FileReader();

      readTable.onload = function (e) {

        let rows = e.target.result.split('\n');

        for(let i=1;i<rows.length; i++){
          let columns = rows[i].split('","');
          let j = finalTable.length;
          finalTable[j] = [columns[2], columns[5], columns[9], columns[10]];
        }

      }

      readTable.readAsText($("#inputfile")[0].files[0]);

});



























