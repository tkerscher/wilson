<template>
    <div class="container">
        <img class="banner" src="/p-one_blue_dark.svg" />
        <p class="disclaimer">
            Currently, there is nothing to show! <br />
            Select a file to watch it.
        </p>
        
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #2c2c2c;
}

.banner {
    height: 20%;
}

.disclaimer {
    font-size: x-large;
    font-weight: bolder;
    color: white;
}
</style>
