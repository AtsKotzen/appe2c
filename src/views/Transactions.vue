<template>
  <div>      
    <div>      
      <AllEmissions />
      <Liquidated />
    </div>
  </div>
</template>
<script>

import AllEmissions from "../components/AllEmissions"
import Liquidated from "../components/Liquidated"

export default {
  name: "Transactions",
  components: { AllEmissions, Liquidated },
};
</script>
