import { VotingConfig } from '../../../src/domain/model/VotingConfig';

describe('VotingConfig', () => {
  describe('constructor', () => {
    it('should set default values if no arguments are passed', () => {
      const config = new VotingConfig();
      expect(config.getSupportRequiredValue()).toEqual(50);
      expect(config.getMinimumAcceptanceQuorumValue()).toEqual(15);
      expect(config.getVoteDurationMinutes()).toEqual(60 * 24 * 7);
    });

    it('should set the values passed as arguments', () => {
      const config = new VotingConfig(60, 20, 60 * 24);
      expect(config.getSupportRequiredValue()).toEqual(60);
      expect(config.getMinimumAcceptanceQuorumValue()).toEqual(20);
      expect(config.getVoteDurationMinutes()).toEqual(60 * 24);
    });
  });

  describe('setSupportRequiredValue', () => {
    it('should set the supportRequired value', () => {
      const config = new VotingConfig();
      config.setSupportRequiredValue(60);
      expect(config.getSupportRequiredValue()).toEqual(60);
    });
  });

  describe('setMinimumAcceptanceQuorumValue', () => {
    it('should set the minimumAcceptanceQuorum value', () => {
      const config = new VotingConfig();
      config.setMinimumAcceptanceQuorumValue(20);
      expect(config.getMinimumAcceptanceQuorumValue()).toEqual(20);
    });
  });

  describe('setVoteDurationDays', () => {
    it('should set the voteDurationMinutes value based on the number of days passed', () => {
      const config = new VotingConfig();
      config.setVoteDurationDays(3);
      expect(config.getVoteDurationMinutes()).toEqual(60 * 24 * 3);
    });

    it('should add the number of days passed to the existing voteDurationMinutes value', () => {
      const config = new VotingConfig(50, 15, 60 * 24 * 3);
      config.setVoteDurationDays(2);
      expect(config.getVoteDurationMinutes()).toEqual(60 * 24 * 2);
    });
  });

  describe('setVoteDurationHours', () => {
    it('should set the voteDurationMinutes value based on the number of hours passed', () => {
      const config = new VotingConfig();
      config.setVoteDurationHours(3);
      expect(config.getVoteDurationMinutes()).toEqual(7*24*60 + 60 * 3);
    });

    it('should add the number of hours passed to the existing voteDurationMinutes value', () => {
      const config = new VotingConfig(50, 15, 60 * 24 * 3);
      config.setVoteDurationHours(2);
      expect(config.getVoteDurationMinutes()).toEqual(60 * 24 * 3 + 60 * 2);
    });
  });

  describe('setVoteDurationMinutes', () => {
    it('should set the voteDurationMinutes value based on the number of minutes passed', () => {
      const config = new VotingConfig();
      config.setVoteDurationMinutes(30);
      expect(config.getVoteDurationMinutes()).toEqual(7*24*60 + 30);
    });

    it('should add the number of minutes passed to the existing voteDurationMinutes value', () => {
      const config = new VotingConfig(50, 15, 60 * 24 * 3);
      config.setVoteDurationMinutes(30);
      expect(config.getVoteDurationMinutes()).toEqual(60 * 24 * 3 + 30);
    });
  });

  describe('getSupportRequiredValue', () => {
    it('should return the supportRequired value', () => {
      const config = new VotingConfig(60);
      expect(config.getSupportRequiredValue()).toEqual(60);
    });
  });

  describe('getMinimumAcceptanceQuorumValue', () => {
    it('should return the minimumAcceptanceQuorum value', () => {
      const config = new VotingConfig(50, 20);
      expect(config.getMinimumAcceptanceQuorumValue()).toEqual(20);
    });
  });

  describe('getVoteDurationDays', () => {
    it('should return the voteDurationMinutes value converted to days', () => {
      const config = new VotingConfig(50, 15, 60 * 24 * 3);
      expect(config.getVoteDurationDays()).toEqual(3);
    });
  });

  describe('getVoteDurationHours', () => {
    it('should return the voteDurationMinutes value converted to hours', () => {
      const config = new VotingConfig(50, 15, 60 * 24 * 3 + 60 * 2);
      expect(config.getVoteDurationHours()).toEqual(2);
    });
  });

  describe('getVoteDurationMinutes', () => {
    it('should return the voteDurationMinutes value', () => {
      const config = new VotingConfig(50, 15, 30);
      expect(config.getVoteDurationMinutes()).toEqual(30);
    });
  });
});