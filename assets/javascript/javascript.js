  var config = {
    apiKey: "AIzaSyCyKOu1be-dT9D8MmggAg6UMkufRDmNx8Y",
    authDomain: "train-scheduler-4a7eb.firebaseapp.com",
    databaseURL: "https://train-scheduler-4a7eb.firebaseio.com",
    storageBucket: "train-scheduler-4a7eb.appspot.com",
    messagingSenderId: "712123880106"
  };
  firebase.initializeApp(config);

      var database = firebase.database();

        function nextTrain(first, freq){
          var startTimeConverted = moment(first, "hh:mm");
          var current = moment();
          var diffTime = moment().diff(moment(startTimeConverted), "minutes");
          var tRemain = diffTime % freq;
          var minLeft = freq - tRemain;
          var nextTrain = moment().add(minLeft, "minutes")
          return moment(nextTrain).format("hh:mm");
        }

        function minLeft(first, freq){
          var startTimeConverted = moment(first, "hh:mm");
          var current = moment();
          var diffTime = moment().diff(moment(startTimeConverted), "minutes");
          var tRemain = diffTime % freq;
          var minLeft = freq - tRemain;
          var nextTrain = moment().add(minLeft, "minutes")
          return minLeft;
        }

      $("#submit").on("click", function() {
        event.preventDefault()

        name = $("#name").val().trim();
        place = $("#place").val().trim();
        first = $("#first").val().trim();
        freq = $("#freq").val().trim();
        var next = nextTrain(first, freq)
        var away = minLeft(first, freq);

        database.ref().push({
          name: name,
          place: place,
          first: first,
          freq: freq,
          next: next,
          away: away
        });


      });

      database.ref().on("child_added", function(snapshot) {

         console.log(snapshot.val());
         var data = snapshot.val();
         var name = data.name;
         var place = data.place;
         var first = data.first;
         var freq = data.freq;
         var next = data.next;
         var away = data.away;
         var trTag = $("<tr>");

         trTag.append("<td>" + name + "</td>" + "<td>" + place + "</td>" + "<td>" + freq + "</td>" + "<td>" + next + "</td>" + "<td>" + away + "</td>");
         $("#tbody").append(trTag);
    });