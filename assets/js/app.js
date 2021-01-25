$(document).ready(function(){
  $.getJSON("assets/json/donations.json", function(data){
      var lastUpdate = moment(data.lastUpdate).format("LLL") + " WITA";
      
      var total = 0;
      var donations = {};

      // Gouping by date
      data.histories.forEach((item, index) => {
        if (donations.hasOwnProperty(item.date)) {
          donations[item.date].data.push(item);
        } else {
          donations[item.date] = {
            date: item.date,
            data: [item]
          };
        }

        total += item.amount;  
      });

      var tbody = "";
      var num = 1;
      for (var [key, value] of Object.entries(donations)) {
        var rowspan = value.data.length;
        var rowspanClass = rowspan > 1 ? "rowspan" : "";
        value.data.forEach((item, index) => {
          var row = "<tr>";
          row += `<td align="center">${num++}</td>`;
          if (index == 0) {
            row += `<td rowspan="${rowspan}" align="center" class="${rowspanClass}">${moment(value.date).format("LL")}</td>`;
          }
          row += `<td>${item.name}</td>`;
          row += `<td>${item.city}</td>`;
          row += `<td align="right">${item.amount.toLocaleString("id")}</td>`;
          row += "</tr>";
          tbody += row;
        });
      }

      // Update the UI
      $('.donate-total').html("Rp" + total.toLocaleString("id"));
      $('.donate-total-histories').html(total.toLocaleString("id"));
      $('.donate-update .date').html(lastUpdate);
      $('.table-histories tbody').html(tbody);
  }).fail(function(){
      console.log("An error has occurred.");
  });
});