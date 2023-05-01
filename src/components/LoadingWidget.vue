<template>
    <v-sheet class="loading-widget d-flex justify-center align-center py-16" height="100%" width="100%" color="transparent">
        <v-progress-circular :size="50" :color="color" indeterminate></v-progress-circular>
    </v-sheet>
</template>
  
<script>
export default {
    props: {
        align: {
            type: String,
            default: "left",
            validator: (val) => ["left", "center", "right"].includes(val),
        },
        color: {
            type: String,
            default: "primary",
        },
    },
};
</script>