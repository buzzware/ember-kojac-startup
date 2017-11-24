import Ember from 'ember';

export async function initialize(appInstance) {
  let logger = appInstance.lookup('logger:main');
  let kojac = appInstance.lookup('Kojac:main');

  let persons = await kojac.read('Person').result();
  let hasSeeds = !!persons;

  if (!hasSeeds) {
    let thing = await kojac.create({Thing: {
      name: 'Widget',
      colour: 'red',
      size: 'large'
    }}).result();
  } else {
    await kojac.read('Thing').request();
  }
}

export default {
  name: 'seeds',
  initialize
};
