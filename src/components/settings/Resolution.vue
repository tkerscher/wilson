<template>
<div class="res-root">
    <div>
        <input type="radio" id="fit" name="resolution" value="fit" v-model="radioValue"/>
        <label for="fit">Fit to window size</label>
    </div>
    <div>
        <input type="radio" id="fixed" name="resolution" value="fixed" v-model="radioValue"/>
        <label for="fixed">Fixed resolution</label>
    </div>
    <table class="res-table">
        <tr>
            <td>Width:</td>
            <td>
                <NumberInput :disabled="!resolution.fixed" 
                             :minValue="300"
                             :maxValue="8000"
                             v-model="resolution.width"/>
            </td>
        </tr>
        <tr>
            <td>Height:</td>
            <td>
                <NumberInput :disabled="!resolution.fixed" 
                             :minValue="300"
                             :maxValue="8000"
                             v-model="resolution.height"/>
            </td>
        </tr>
    </table>
</div>
</template>

<script setup lang="ts">
import NumberInput from "../input/NumberInput.vue"
import { ref, watch } from "vue"
import { useResolution } from "../../stores/resolution"
const resolution = useResolution()

const radioValue = ref(resolution.fixed ? 'fixed' : 'fit')
watch(radioValue, v => resolution.fixed = v == 'fixed')

const min = 300
const max = 8000

function updateWidth(e: Event) {
    const input = e.target as HTMLInputElement
    const width = Number.parseInt(input.value)
    if (width >= min && width <= max) {
        resolution.width = width
    }
    else {

    }
}
</script>

<style scoped>
label {
    margin-left: 5px;
    user-select: none;
}

.res-root {
    text-align: left;
}
.res-root > * {
    margin: 10px;
}

.res-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 6px;
    margin: 5px 0;
}
.res-table tr td:nth-child(1) {
    width: 80px;
    text-align: right;
    vertical-align: top;
    user-select: none;
}
</style>
