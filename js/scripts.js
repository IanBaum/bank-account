function Account(name, initialAmount){
  this.name = name;
  this.balance = initialAmount;
  this.history = [];
}
Account.prototype.deposit = function (amount) {
  this.balance += amount;
  this.history.push({'time': Date.now(), 'transaction':"+ $" + amount});
};
Account.prototype.withdraw = function (amount) {
  this.balance -= amount;
  this.history.push({'time': Date.now(), 'transaction':"- $" + amount});
};

$(document).ready(function(){
  $('#newAccount').submit(function(event){
    event.preventDefault();

    var newName = $('#name').val();
    var initialDeposit = parseFloat($('#initialDeposit').val());

    var newAccount = new Account(newName, initialDeposit);
    console.log(newAccount.balance);

    $("#name").val("");
    $("#initialDeposit").val("");
    $("#accountName").text(newAccount.name +"'s Account");
    $("#accountBalance").text("$" + newAccount.balance.toFixed(2));
    $(".jumbotron").show();


    $('#transaction').submit(function(event){
      event.preventDefault()

      $("#accountHistory").empty();

      var depositAmount = parseFloat($('#depositInput').val());
      var withdrawAmount = parseFloat($('#withdrawInput').val());

      if(depositAmount) {newAccount.deposit(depositAmount);}
      if(withdrawAmount){newAccount.withdraw(withdrawAmount);}
      $("#depositInput").val("");
      $("#withdrawInput").val("");

      $("#accountBalance").text("$" + newAccount.balance.toFixed(2));

      for(var i = newAccount.history.length -1; i > newAccount.history.length - 6;i--){
        if(i >= 0){
          var item = newAccount.history[i];
          $("#accountHistory").append("<li>" + item.transaction + " " + moment(item.time).fromNow() + "</li>");
        }else{
          break;
        }
      };

      console.log(newAccount.balance);
    })
  })
})
