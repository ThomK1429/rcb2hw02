$(document).ready(function() {


   $("#btnSearch").on("click", function(event) {
         //$("#searchterm").val( "beach boys" );  // set the value for test purposes
         clearScreenData(); // clear any prior screen data returned by API

         if ($("#searchterm").val().trim() != "") {
            btnSearch();
         } else {
            $("#screenData").append("	<br><br><p id='noData'> No Search Term entered.</p>");
            consoleIt();
         }

      }) // end #btnSearch on click


   // Clear input fields and html data on screen
   $("#btnClear").on("click", function(event) {
      //alert("Clear btn clicked");
      clearInput();
      clearScreenData();
   })


   function btnSearch() {
      var q = $("#searchterm").val().trim();
      var numRecs = 4;
      if ($("#numRecs").val().trim() != "")
         numRecs = $("#numRecs").val().trim();
      if ((numRecs >= 1) && (numRecs <= 4)) {} else {
         numRecs = 4
      };


      console.log("NY Times API has been called. Please wait for its response. ");
      //alert("Search btn clicked");
      //alert("q=" + q);

      // query statement setup
      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url += '?' + $.param({
         'api-key': "b66102deb71f4f7691fa9ef69cd8ddbc",
         'q': q

      });


      if ($("#startDate").val().trim() != "") {
         url += '&' + $.param({
            'begin_date': +$("#startDate").val().trim()
         });
      }
      if ($("#endDate").val().trim() != "") {
         url += '&' + $.param({
            'end_date': +$("#endDate").val().trim()
         });
      }
      console.log("url=" + url);

      $.ajax({
            url: url,
            method: 'GET',
         })
         .done(function(result) {
            consoleIt(result, q);

            if (result.response.meta.hits != 0) {
               for (var i = 0;
                  (i < result.response.docs.length && i < numRecs); i++) {
                  $("#screenData").append("<br><a href='" + result.response.docs[i].web_url +
                     "' target='_blank' id='searchLinks' > " +
                     result.response.docs[i].headline.main.slice(0, 110)) + "</a>";
               }

            } else {
               $("#screenData").append("	<br><br><p id='noData'> No data found for this search criteria.</p>");
            };

         }).fail(function(err) {
            throw err;
         });
   }


   function clearInput() {
      // clear input fields
      $("#searchterm").val("");
      $("#numrecs").val("");
      $("#startDate").val("");
      $("#endDate").val("");
   }

   function clearScreenData() {
      // clear screen Data (resultant API links)
      $("#screenData").empty();
   }

   function consoleIt(result, q) {
      //console.log("result data:" + JSON.stringify(result));
      //console.log("hits:" + result.response.meta.hits);
      //console.log("web_url:" + result.response.docs[0].web_url);
      //console.log("headline:" + result.response.docs[0].headline.main);

      console.log("NY TIMES API");
      console.log("Search Term = " + q);
      console.log("Headlines returned from the API...");

      if ($("#searchterm").val().trim() != "") {
         for (var i = 0; i < result.response.docs.length; i++) {
            console.log(i + 1, "==> ", result.response.docs[i].headline.main);
         }
      } else {
         console.log("No Search Term entered.");
      }


   }

})