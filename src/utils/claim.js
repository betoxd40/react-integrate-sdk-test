import IntegrateSDK from "../lib/factom-harmony-integrate-js-sdk/dist/factom-harmony-integrate-js-sdk";

const configure = {
  baseUrl: "https://api.factom.com/v1",
  accessToken: {
    appId: "836767c1",
    appKey: "85cd2bfee845a34f67353ead3cd7ea25"
  }
};

const Integrate = new IntegrateSDK(configure);

const createClaim = claimObj => Integrate.claim.create(claimObj);

const signClaim = claimObj => Integrate.claim.sign(claimObj);

export { createClaim, signClaim };
