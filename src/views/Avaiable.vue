<template>
  <div>    
    <div>
      <AllAvailable />
      <AvailableList />
    </div>
  </div>
</template>
<script>
import AllAvailable from "../components/AllAvailable";
import AvailableList from "../components/AvaiableList";
export default {
  name: "Available",
  components: { AllAvailable, AvailableList },
};
</script>
