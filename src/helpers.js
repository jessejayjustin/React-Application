export const summaryDonations = (donations) => (
  donations.reduce((accumulator, value) => (+accumulator + +value)) /* One or possibly both of the variables is a string instead of a number which make's the amount value a string concatenation so i added unary + operator in front of variables to convert into integer*/
);
