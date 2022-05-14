<template>
  <div>
    <Card></Card>
    <SaleCom style="margin-top:15px"></SaleCom>
    <Observe style="margin-top:15px"></Observe>
  </div>
</template>

<script>
import Card from './Card'
import SaleCom from './Sale'
import Observe from './Observe'
export default {
  name: 'dashBord',
  components: {
    Card,
    SaleCom,
    Observe
  }
}
</script>

<style>

</style>
