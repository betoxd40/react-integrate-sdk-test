// import { createClaim, signClaim } from "./claim";
import IntegrateSDK from "../lib/factom-harmony-integrate-js-sdk/dist/factom-harmony-integrate-js-sdk";

const configure = {
  baseUrl: "https://api.factom.com/v1",
  accessToken: {
    appId: "836767c1",
    appKey: "85cd2bfee845a34f67353ead3cd7ea25"
  }
};

const Integrate = new IntegrateSDK(configure);

const claimObject = {
  id: "http://example.gov/credentials/3732",
  type: ["Credential", "ProofOfAgeCredential"],
  "@context": "https://w3id.org/identity/v1",
  ageOver: 21,
  issuer: "https://dmv.example.gov",
  issued: "2010-01-01"
};

const claimObjectExpected = {
  "@context": "https://w3id.org/identity/v1",
  id: "http://example.gov/credentials/3732",
  type: ["Credential", "ProofOfAgeCredential"],
  issuer: "https://dmv.example.gov",
  issued: "2010-01-01",
  ageOver: 21
};

const signObject = {
  signer:
    "did:factom:2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79",
  signerPrivateKey: "idsec32vrpyBYP12MpVtrhyEgX5dqZLD4hKhorHJjs2T9qY9vWntmB6"
};

const signVerify = {
  signerPublicKey: "idpub2nJz8MYB2gSWUCpSH6rJdnMoJxUsWd8q8hMrhLQztJvGFjoyTR",
  verbose: true
};

const registerObject = {
  destinationChainId:
    "57bb92d7130b67caa18267da46e61248351ee901ae4d54573a6a2ad3500d19cb",
  signerPrivateKey: "idsec32vrpyBYP12MpVtrhyEgX5dqZLD4hKhorHJjs2T9qY9vWntmB6",
  signerChainId:
    "2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79"
};

describe("Claim test suite", function() {
  it("create should be valid", () => {
    const claim = Integrate.claim.create(claimObject);
    expect(claim).toEqual(claimObjectExpected);
  });

  it("sign should be valid", () => {
    const signedClaim = Integrate.claim.create(claimObject).sign(signObject);
    expect(signedClaim).toHaveProperty("proof");
  });

  it("verify should be valid", () => {
    const verifyClaim = Integrate.claim
      .create(claimObject)
      .sign(signObject)
      .verify(signVerify);
    const signatureCheckFromUnsignedClaim = verifyClaim.proof[0].valid;
    expect(signatureCheckFromUnsignedClaim).toBeTruthy();
  });

  it("register should be valid", async () => {
    const registerClaim = await Integrate.claim
      .create(claimObject)
      .sign(signObject)
      .register(registerObject);
    expect(registerClaim).toHaveProperty("_factomMetadata");
  });
});
