$(document).ready(function(){
  $.getJSON("assets/json/donations.json", function(data){
      var lastUpdate = moment(data.lastUpdate).format("LLL") + " WITA";
      
      var donations = {};

      // Gouping by month and date
      data.histories.forEach((item, index) => {
        var month = item.date.substring(0, 7);
        var date = item.date;

        // Checking month group 
        if (!donations.hasOwnProperty(month)) {
          donations[month] = {
            month: item.date,
            dates: {}
          };
        }

        if (!donations[month].dates.hasOwnProperty(date)) {
          donations[month].dates[date] = {
            date: item.date,
            data: [item]
          };
        } else {
          donations[month].dates[date].data.push(item);
        }
      });

      var tbody = "";
      var num = 1;
      var monthLength = Object.keys(donations).length;
      var total = 0;

      // Iterating months
      for (var [monthKey, month] of Object.entries(donations)) {
        // Iterating dates
        var monthTotal = 0;
        for (var [dateKey, value] of Object.entries(month.dates)) {
          var rowspan = value.data.length;
          var rowspanClass = rowspan > 1 ? "rowspan" : "";
          value.data.forEach((item, index) => {
            monthTotal += item.amount;
            total += item.amount;

            var row = "<tr>";
            row += `<td align="">${num++}</td>`;
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

        // Show month total if there is multiple months
        if (monthLength > 1) {
          tbody += "<tr>";
          tbody += `<th colspan="4" align="center">Total ${moment(monthKey).format("MMMM YYYY")}</th>`;
          tbody += `<th align="right">${monthTotal.toLocaleString("id")}</th>`;
          tbody += "</tr>";
        }
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