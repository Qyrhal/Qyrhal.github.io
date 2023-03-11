function calculate() {
    var balance = document.getElementById("balance").value;
    var stop_loss = document.getElementById("stop_loss").value;
    var risk = document.getElementById("risk").value;
    var buy = document.getElementById("buy").value;
    var risk_amount = balance * (risk / 100)
    var position_size = risk_amount / (buy - stop_loss);
    document.getElementById("position_size").innerHTML = position_size;
    document.getElementById("risk_amount").innerHTML = risk_amount;
  }