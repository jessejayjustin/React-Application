const summaryDonations = (data) => {
  var sum=0; 
  for(var i=0; i < data.length; i++) {
    sum += data[i].amount
  }
  return sum;
}

export default summaryDonations;

