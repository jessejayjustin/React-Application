import { summaryDonations } from '../helpers';

describe('helpers', function() {
  test('`summaryDonations` should calculate donations correctly', function() {
    expect(summaryDonations([1, 2, 3, 5])).toEqual(11);
  });
});
