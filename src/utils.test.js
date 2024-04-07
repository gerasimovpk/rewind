// utils.test.js
import { filterTitle } from './utils';

describe('filterTitle', () => {
  it('should remove scores from the title', () => {
    expect(filterTitle('Barcelona - Real 4:3')).toBe('Barcelona - Real');
    expect(filterTitle('Barcelona - Real 4 - 3')).toBe('Barcelona - Real');
    expect(filterTitle('Barcelona - Real 4 x 3')).toBe('Barcelona - Real');
    expect(filterTitle('Barcelona 4 x 3 Real')).toBe('Barcelona Real');
    expect(filterTitle('PSG 4 × 0 Barcelona')).toBe('PSG Barcelona');
    expect(filterTitle('Barcelona - Real 4-3')).toBe('Barcelona - Real');
    expect(filterTitle('Barcelona - Real (4:3)')).toBe('Barcelona - Real');
    expect(filterTitle('Barcelona - Real (4 - 3)')).toBe('Barcelona - Real');
    expect(filterTitle('Barcelona - Real (4-3)')).toBe('Barcelona - Real');
    expect(filterTitle('Bayern Munich v Chelsea [1-1]-[ Penalties]')).toBe('Bayern Munich v Chelsea');
    expect(filterTitle('Bayern Munich v Chelsea [1-1]')).toBe('Bayern Munich v Chelsea');
    expect(filterTitle('Real Madrid vs FC Barcelona (3-4) 2013/2014 PARTIDO COMPLETO')).toBe('Real Madrid vs FC Barcelona 2013/2014 PARTIDO COMPLETO');
  });

  xit('should remove disconnected scores from the title', () => {
    expect(filterTitle('1998.09.30 Spartak Moscow 2 - Real Madrid 1 (Full Match 60fps - 1998-99 Champions League)')).toBe('1998.09.30 Spartak Moscow - Real Madrid (Full Match 60fps - 1998-99 Champions League)');
  
  });

  it('should not modify titles without scores', () => {
    expect(filterTitle('Barcelona - Real')).toBe('Barcelona - Real');
    expect(filterTitle('Barcelona: Real')).toBe('Barcelona: Real');
    expect(filterTitle('Chelsea vs Barcelona 2009 the SHAMEFUL Match that shocked World of Football')).toBe('Chelsea vs Barcelona 2009 the SHAMEFUL Match that shocked World of Football');
    expect(filterTitle("Barcelona vs. Chelsea | UEFA Women's Champions League Semi-final 2022-23 Second Leg Full Match")).toBe("Barcelona vs. Chelsea | UEFA Women's Champions League Semi-final 2022-23 Second Leg Full Match");
  });
});it('should remove scores from the title', () => {
  expect(filterTitle('Barcelona - Real 4:3')).toBe('Barcelona - Real');
  expect(filterTitle('Barcelona - Real 4 - 3')).toBe('Barcelona - Real');
  expect(filterTitle('Barcelona - Real 4 x 3')).toBe('Barcelona - Real');
  expect(filterTitle('Barcelona 4 x 3 Real')).toBe('Barcelona Real');
  expect(filterTitle('Barcelona - Real 4-3')).toBe('Barcelona - Real');
  expect(filterTitle('Barcelona - Real (4:3)')).toBe('Barcelona - Real');
  expect(filterTitle('Barcelona - Real (4 - 3)')).toBe('Barcelona - Real');
  expect(filterTitle('Barcelona - Real (4-3)')).toBe('Barcelona - Real');
  expect(filterTitle('Bayern Munich v Chelsea [1-1]-[ Penalties]')).toBe('Bayern Munich v Chelsea');
  expect(filterTitle('Bayern Munich v Chelsea [1-1]')).toBe('Bayern Munich v Chelsea');
});

it('should remove disconnected scores from the title', () => {
  expect(filterTitle('1998.09.30 Spartak Moscow 2 - Real Madrid 1 (Full Match 60fps - 1998-99 Champions League)')).toBe('1998.09.30 Spartak Moscow - Real Madrid (Full Match 60fps - 1998-99 Champions League)');
  expect(filterTitle('Real Madrid vs FC Barcelona (3-4) 2013/2014 PARTIDO COMPLETO')).toBe('Real Madrid vs FC Barcelona 2013/2014 PARTIDO COMPLETO');
});

it('should not modify titles without scores', () => {
  expect(filterTitle('Barcelona - Real')).toBe('Barcelona - Real');
  expect(filterTitle('Barcelona: Real')).toBe('Barcelona: Real');
  expect(filterTitle('Chelsea vs Barcelona 2009 the SHAMEFUL Match that shocked World of Football')).toBe('Chelsea vs Barcelona 2009 the SHAMEFUL Match that shocked World of Football');
  expect(filterTitle("Barcelona vs. Chelsea | UEFA Women's Champions League Semi-final 2022-23 Second Leg Full Match")).toBe("Barcelona vs. Chelsea | UEFA Women's Champions League Semi-final 2022-23 Second Leg Full Match");
});