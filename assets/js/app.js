$(document).ready(function(){
  $.getJSON("assets/json/donates.json", function(data){
      var lastUpdate = moment(data.lastUpdate).format("LL");
      
      var total = 0;
      var tbody = "";
      data.histories.forEach((item, index) => {
        total += item.amount;  
        var row  = "<tr>";
            row += '<td align="center">' + (index + 1) + '</td>'; 
            row += '<td align="center">' + (moment(item.date).format("LL")) + '</td>'; 
            row += '<td>' + (item.name) + '</td>'; 
            row += '<td>' + (item.city) + '</td>'; 
            row += '<td align="right">' + (item.amount.toLocaleString("id")) + '</td>'; 
            row += "</tr>";
        tbody += row;
      });

      // Update the UI
      $('.donate-total').html("Rp" + total.toLocaleString("id"));
      $('.donate-total-histories').html(total.toLocaleString("id"));
      $('.donate-update .date').html(lastUpdate);
      $('.table-histories tbody').html(tbody);
  }).fail(function(){
      console.log("An error has occurred.");
  });
});