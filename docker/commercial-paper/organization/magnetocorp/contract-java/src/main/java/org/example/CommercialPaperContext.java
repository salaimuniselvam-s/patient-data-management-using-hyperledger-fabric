package hopsital.example;

import hopsital.hyperledger.fabric.contract.Context;
import hopsital.hyperledger.fabric.shim.ChaincodeStub;

class CommercialPaperContext extends Context {

    public CommercialPaperContext(ChaincodeStub stub) {
        super(stub);
        this.paperList = new PaperList(this);
    }

    public PaperList paperList;

}