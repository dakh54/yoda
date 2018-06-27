import { Injectable } from "@angular/core";
import { Ilead } from "../models/ilead";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase/app";
import { AuthService } from "../auth/auth.service";
import { promise } from "protractor";
import { Utility } from "../shared/utility";


@Injectable({
  providedIn: "root"
})
export class LeadService {
  private fireStore;
  private leadsCollectionName: string = "leads";
  private leadsHistoryCollectionName: string = "leadHistory";
  private branchCollectionName: string = "branches";
  private leadStatCollectionName: string = "leadStat";

  constructor(private af: AngularFirestore, private authService: AuthService) {
    this.fireStore = this.af.firestore;
  }

  add(lead: Ilead) {
    //get branchdocref
    let branchDocRef = this.fireStore
      .collection(this.branchCollectionName)
      .doc(lead.address.city);

    // create reference to doc in leadStat collection
    let leadStatDocRef = this.fireStore
      .collection(this.leadStatCollectionName)
      .doc("open");

    // create reference to doc in leads collection
    let leadsDocRef = this.fireStore.collection(this.leadsCollectionName).doc();

    // get leadStateDoc
    return leadStatDocRef.get().then(leadsDoc => {
      if (!leadsDoc.exists) {
        console.log("Document (leadStat) does not exist", leadsDoc.data());
        throw "Document (leadStat) does not exist";
        // return promise.rejected("Fail to retreive current document.");
      }

      let leadStateOpen = leadsDoc.data().quantity;
      leadStateOpen =
        leadStateOpen == "" || leadStateOpen == null ? 1 : leadStateOpen + 1;

      // create transaction
      return this.af.firestore.runTransaction(transaction => {
        return transaction.get(branchDocRef).then(branchDoc => {
          if (!branchDoc.exists) {
            console.log(
              `Branch document does not exist (${lead.address.city})`
            );
            // return Promise.reject('Fail to create new lead');
            throw `Branch document does not exist (${lead.address.city})`;
          }

          // update open in leadStat collection
          let numberOfOpenLead = branchDoc.data().open;
          numberOfOpenLead =
            numberOfOpenLead == null || numberOfOpenLead == ""
              ? 1
              : numberOfOpenLead + 1;

          let serverTime = firebase.firestore.FieldValue.serverTimestamp();

          // create new record in leads collection
          // remove undefined field         
          let user = Utility.removeEmptyOrNullProperty(this.authService.User);
          lead.createBy = user;
          transaction.set(leadsDocRef, lead);

          // create reference to doc in leadHistory collection
          let leadHistoryDocRef = this.fireStore
            .collection(this.leadsHistoryCollectionName)
            .doc(leadsDocRef.id)
            .collection("history")
            .doc();

          // update createAt field in newly created record
          transaction.update(leadsDocRef, {
            createAt: serverTime
          });

          // update numberOfOpenLead in Branch
          transaction.update(branchDocRef, {
            open: numberOfOpenLead
          });

          // update leadStat
          transaction.update(leadStatDocRef, {
            quantity: leadStateOpen
          });

          // console.log("writing history before");
          // create new record in leadHistory collection
          // throw 'error test';
          transaction.set(leadHistoryDocRef, lead);
        });
      });
      // update branch.openLeadQuantity
      // update lead status Open quantity
      // create new record in leads
      // create new record in leadHistory
    });
  }
}
