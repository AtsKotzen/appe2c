import Vue from "vue";
import Vuex from "vuex";
import * as fb from "./firebase";
import router from "./router";

Vue.use(Vuex);

// realtime firebase

// All Tokens
fb.emissions.onSnapshot((snapshot) => {
  let tokensArray = [];

  snapshot.forEach((doc) => {
    let token = doc.data();
    token.id = doc.id;   
    tokensArray.push(token);
       
  });

  store.commit("setTokens", tokensArray);
});
// Waiting to Liquidate
fb.waitingToLiquidate.onSnapshot((snapshot) => {
  let waitingLiquidationArray = [];

  snapshot.forEach((doc) => {
    let intention = doc.data();
    intention.id = doc.id;

    waitingLiquidationArray.push(intention);
  });

  store.commit("setWaitingToLiquidate", waitingLiquidationArray);
});
// Intentions Liquidation
fb.intentionLiquidation.onSnapshot((snapshot) => {
  let liquidationArray = [];

  snapshot.forEach((doc) => {
    let token = doc.data();
    token.id = doc.id;

    liquidationArray.push(token);
  });

  store.commit("setIntentionsLiquidation", liquidationArray);
});
// All Users
fb.usersCollection.orderBy("name", "desc").onSnapshot((snapshot) => {
  let usersArray = [];

  snapshot.forEach((doc) => {
    let user = doc.data();
    user.id = doc.id;

    usersArray.push(user);
  });

  store.commit("setUsers", usersArray);
});
// All Wishes
fb.allWishes.onSnapshot((snapshot) => {
  let wishesArray = [];

  snapshot.forEach((doc) => {
    let wish = doc.data();
    wish.id = doc.id;

    wishesArray.push(wish);
  });

  store.commit("setAllWishes", wishesArray);
});
// All Available
fb.available.onSnapshot((snapshot) => {
  let availableArray = [];

  snapshot.forEach((doc) => {
    let available = doc.data();
    available.id = doc.id;

    availableArray.push(available);
  });

  store.commit("setAvailable", availableArray);
});
// Available Active
fb.availableActive.onSnapshot((snapshot) => {
  let availableActiveArray = [];

  snapshot.forEach((doc) => {
    let availableActive = doc.data();
    availableActive.id = doc.id;

    availableActiveArray.push(availableActive);
  });

  store.commit("setAvailableActive", availableActiveArray);
});

// All Liquidations
fb.liquidations.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
  let liquidationsArray = [];

  snapshot.forEach((doc) => {
    let liquidations = doc.data();
    liquidations.id = doc.id;

    liquidationsArray.push(liquidations);
  });

  store.commit("setliquidations", liquidationsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    users: [],
    tokens: [],
    myTokens: [],
    waitingToLiquidate: [],
    allWishes: [],
    available: [],
    availableActive: [],
    intentionLiquidation: [],
    liquidations: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val;
    },
    setUsers(state, val) {
      state.users = val;
    },
    setTokens(state, val) {
      state.tokens = val;
    },
    setMyTokens(state, val) {
      state.myTokens = val;
    },
    setWaitingToLiquidate(state, val) {
      state.waitingToLiquidate = val;
    },
    setAllWishes(state, val) {
      state.allWishes = val;
    },
    setAvailable(state, val) {
      state.available = val;
    },
    setAvailableActive(state, val) {
      state.availableActive = val;
    },
    setIntentionsLiquidation(state, val) {
      state.intentionLiquidation = val;
    },
    setliquidations (state, val) {
      state.liquidations = val;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        createdAt: new Date(),
        name: form.name,
        //title: form.title,
        uid: user.uid,
      });

      // fetch user profile and set in state
      await dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/painel");
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut();

      // clear user data from state
      commit("setUserProfile", {});

      // redirect to login view
      router.push("/login");
    },
    async sendInviteEmail() {
      alert("Em desenvolvimento...Essa funcionalidade estará disponível em breve!!!");  
    },
    async emmitTokens({ state, commit }, payload) {  
      await fb.emissions.add({
        createdAt: new Date(),  
        fromUid: fb.auth.currentUser.uid,  
        fromName: state.userProfile.name,
        initialAmount: payload.amount,
        currentAmount: payload.amount,
        toName: payload.toName,
        //toUid: payload.toUid,
        description: payload.description,
        //liquidationWish: payload.preLiquiWish,
        //contact: payload.contact
      });
      $('#addEmission').modal('hide');
    },
    async setLiquidateIntentionDb({ state, commit }, payload) { 
      await fb.intentionLiquidation.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        emissionId: payload.emissionId,          
        fromName: state.userProfile.name,
        name: payload.toName,
        uid: payload.toUid,
        description: payload.description,
        wishId: payload.wishId,
        completed: false
      });
      alert("Um aviso de Intenção de Liquidação será enviado!");
    },
    async liquidateTokens({ commit }, payload) {
      // update token amount
      const tokenDoc = payload.selected.id;
      const currentAmount = payload.currentAmount;
      const amount = payload.amount;
      const total = currentAmount - amount;
      const toName = payload.toName;
      const fromName = state.userProfile.name;
      const liquidationMethod = payload.how;
      const description = payload.description;
      const comments = payload.comments;
      
      if(amount != 0 && amount <= currentAmount) {
        await fb.liquidations.add({
          createdAt: new Date(),
          toName: toName, 
          emissionId: tokenDoc,
          amount: amount,
          fromName: fromName,
          toName: toName,
          how: liquidationMethod,
          comments: comments,
          description: description,
        });
        await fb.emissions.doc(tokenDoc).update({
          currentAmount: total
        });  
        alert("Liquidação concluída!");
      }else {
        alert("A quantidade a liquidar deve ser menor que a atual")
      }    
    },
    async saveWishAccessDb({ state, commit }, payload) {
      await fb.allWishes.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        title: payload.title,
        description: payload.description,
        completed: false,
      });     
      $('#addwish').modal('hide');
    },
    async saveAvailableDb({ state, commit }, payload) {
      await fb.available.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        title: payload.title,
        description: payload.description,
        mode: payload.mode,
        tags: payload.tags,
        active: true,
      });
      $('#addavailable').modal('hide');  
    },  
    async fetchUsers({ commit }) {
      await fb.usersCollection.get();
      const users = await fb.usersCollection.get();
      // set users in state
      commit("setUsers", users.data());
    },  
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        //title: user.title,
        uid: user.uid
      });
      dispatch("fetchUserProfile", { uid: userId });
    },
  },
});

export default store;
