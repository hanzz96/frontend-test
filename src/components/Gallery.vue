<template>
      <v-item-group selected-class="bg-primary">
          <v-row>  
            <v-col
              v-for="n in 8"
              :key="n"
              cols="3"
            >
              <v-item v-slot="{ isSelected, selectedClass, toggle }">
                <v-card
                  :class="['align-center', selectedClass]"
                  dark
                  :title="`Photo ${n}`"
                  :subtitle="isSelected? `Content ${n} is selected.` : `Subtitle for Content ${n}`"
                  @click="toggle"
                >

                <v-img src="https://picsum.photos/512/128?random" height="128" cover></v-img>

                <v-card-text>
                  During my last trip to South America, I spent 2 weeks traveling through Patagonia in Chile.
                </v-card-text>

                </v-card>
              </v-item>
            </v-col>
          </v-row>
      </v-item-group>
</template>

<script>

</script>

<style>

</style>
