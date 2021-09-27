/* eslint-disable no-undef */
const RentASpot = artifacts.require('RentASpot');

contract('RentASpot', () => {
  it('can have an image added', async () => {
    const instance = await RentASpot.deployed();
    const imageStr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAJElEQVQ4jWNgGJbgPxSTKkc9AyjSgMsQqtpIUM1/AngUDD8AAI+JFuo+DQ67AAAAAElFTkSuQmCC';

    await instance.rent(imageStr, 1, 1);

    const image = await instance.images(0);

    assert.equal(image[0], imageStr);
    assert.equal(image[1].toNumber(), 1);
    assert.equal(image[2].toNumber(), 1);
  });
});
