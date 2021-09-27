<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import 'bootstrap/scss/bootstrap.scss';
import type Web3Type from 'web3';
import RentASpotJson from '../build/contracts/RentASpot.json';

// eslint-disable-next-line import/extensions, import/no-unresolved
import { RentASpotInstance, RentASpotContract } from '../types/truffle-contracts/RentASpot';

declare class Web3 extends Web3Type {}

const account = ref('');

// eslint-disable-next-line no-undef
const images = ref<Array<{ 0: string; 1: BN; 2: BN }>>([]);

let rentASpot: RentASpotInstance;

const error = ref('');

onMounted(async () => {
  // @ts-ignore
  const web3Instance: Web3 = new Web3('ws://localhost:7545');
  account.value = await web3Instance.eth.getCoinbase();

  // @ts-ignore
  // eslint-disable-next-line no-undef
  const contract: RentASpotContract = TruffleContract(RentASpotJson);
  // @ts-ignore
  contract.setProvider(web3Instance.currentProvider);
  rentASpot = await contract.deployed();

  const imageAmt = (await rentASpot.length()).toNumber();

  // Cool fill in effect:
  // for (let i = 0; i < imageAmt; i++) {
  //   images.value.push(await rentASpot.images(i));
  // }

  Promise.all((new Array(imageAmt)).fill(null).map(async (_, i) => {
    images.value.push(await rentASpot.images(i));
  }));
});

// upload image
const form = reactive({
  image: '',
  xPixel: 0,
  yPixel: 0,
});

const onImageAsDataUrl = (event: ProgressEvent<FileReader>) => {
  error.value = '';
  const url = event.target?.result;
  form.image = url?.toString() ?? '';
  if (form.image.length > 10000) {
    error.value = 'That image is too big, please use small images.';
  }
};

const onImage = (event: Event) => {
  const el = (event.target as HTMLInputElement);

  if (!el.files?.length) {
    return;
  }

  const reader = new FileReader();

  reader.onload = onImageAsDataUrl;

  reader.readAsDataURL(el.files[0]);
};

const onSubmit = async () => {
  if (error.value.length) {
    return;
  }

  rentASpot.rent(form.image, form.xPixel, form.yPixel, { from: account.value });
};
</script>

<template>
  <main class="container mt-5">
    <div
      class="position-relative images-view">
      <img
        v-for="(image, i) in images"
        :key="i"
        :style="`left: ${image[1]}px; top: ${image[2]}px`"
        :src="image[0]"
        class="position-absolute"
      />
    </div>

    <p v-if="!account.length">Loading account</p>
    <p v-else>Your account: {{ account }}</p>
    <div v-if="error.length" class="alert alert-danger">{{ error }}</div>

      <form @submit.prevent="onSubmit" class="d-flex flex-column gap-3">
        <div class="form-group">
          <label for="image">Select image</label>
          <input @input="onImage" id="image" type="file" class="form-control" accept="image/*">
        </div>

        <div class="form-group">
          <label for="x">Select x pixel</label>
          <input v-model="form.xPixel" type="number" class="form-control">
        </div>

        <div class="form-group">
          <label for="x">Select y pixel</label>
          <input v-model="form.yPixel" type="number" class="form-control">
        </div>

        <input :disabled="!!error.length" type="submit" value="Go!" class="btn btn-primary">
      </form>
  </main>
</template>

<style lang="scss">
  .images-view {
    width: 500px;
    height: 500px;
    overflow: hidden;
    margin: 20px auto;
    border: 1px solid black;
  }
</style>
