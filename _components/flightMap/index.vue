<template>
    <div>
        <flightMap />
        <flightDetail />
    </div>
</template>
<script>
import flightMap from './flightMap.vue';
import flightDetail from '../modal/flightDetail.vue'; 
export default {
    components: {
        flightMap,
        flightDetail,
    }
}
</script>