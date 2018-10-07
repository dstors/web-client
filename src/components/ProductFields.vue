<template>
	<v-slide-y-transition>
    <v-container>
      <v-layout column>
        <v-flex offset-xs1 xs4 >
          <span class="headline font-weight-regular">What kind of offer is it?</span>
          <v-btn small
            v-for="(type, i) in types"
            block
            :color="type.color"
            :flat="newProduct.type !== type.value"
            :key="i"
            @click="setType(types[i].value)">
            {{ type.label }}
            <v-icon right>{{ type.icon }}</v-icon>
          </v-btn>
        </v-flex>
        <v-flex offset-xs1 xs12 class="mb-4">
          <span class="headline font-weight-regular">Category</span>
          <v-select
            :items="categories"
            v-model="newProduct.category"
            label="Pick a product"
            item-text="title"
            return-object
            solo>
          </v-select>
        </v-flex>
        <v-flex offset-xs1 xs12 class="mb-4">
          <span class="headline font-weight-regular">Product Name</span>
          <v-text-field
            v-model="newProduct.name"
            solo>
          </v-text-field>
        </v-flex>
        <v-flex offset-xs1 xs12 class="mb-4">
          <span class="headline font-weight-regular">Description</span>
          <v-textarea
            v-model="newProduct.description"
            name="input-7-1"
            solo>
          </v-textarea>
        </v-flex>
        <template v-if="(newProduct.type && newProduct.type !== 'direct-sell')">
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline font-weight-regular">Ends at</span>
            <v-menu
              ref="dateMenu"
              :close-on-content-click="false"
              v-model="dateMenu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px">
              <v-text-field
                slot="activator"
                v-model="date"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                solo
                :allowed-dates="allowedDates"
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)">
              </v-text-field>
              <v-date-picker v-model="date" no-title @input="dateMenu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <v-layout row>
              <v-flex xs4 class="px-1">
                <v-select
                  clearable
                  :items="ampm"
                  label="AM/PM"
                  solo>
                </v-select>
              </v-flex>
              <v-flex xs4 class="px-1">
                <v-select
                  clearable
                  :items="hours"
                  label="Hour"
                  solo>
                </v-select>
              </v-flex>
              <v-flex xs4 class="px-1">
                <v-select
                  clearable
                  :items="minutes"
                  label="Minute"
                  solo>
                </v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </template>
        <template v-if="newProduct.type === 'auction'">
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline font-weight-regular">Starting price</span>
            <v-text-field
              v-model="startingPrice"
              solo
              type="number">
            </v-text-field>
          </v-flex>
        </template>
        <template v-if="newProduct.type === 'direct-sell'">
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline font-weight-regular">Price</span>
            <v-text-field
              v-model="price"
              solo
              type="number">
            </v-text-field>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline font-weight-regular">Stock</span>
            <v-text-field
              solo
              v-model="newProduct.stock"
              type="number">
            </v-text-field>
          </v-flex>
        </template>
        <v-flex offset-xs1 xs12 class="mb-4">
          <span class="headline font-weight-regular">Images</span>
          <div v-for="(imageLink, i) in newProduct.pictures">
            <v-layout row wrap>
              <v-text-field
                v-model="newProduct.pictures[i]"
                solo>
              </v-text-field>
              <v-btn
                v-if="newProduct.pictures.length - 1 === i"
                icon>
                <v-icon
                  @click="addPicture"
                  color="primary">
                  add_circle
                </v-icon>
              </v-btn>
              <v-btn icon v-else>
                <v-icon
                  @click="removePicture(i)"
                  color="primary">
                  close
                </v-icon>
              </v-btn>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'product-fields',
  props: ['dark', 'content', 'featured', 'title'],
  data() {
    return {
      date: null,
      dateFormatted: null,
      dateMenu: false,
      menu2: false,
      products: [],
      types: [
        { value: 'direct-sell', label: 'Direct Sell', icon: 'attach_money', color: 'green' },
        { value: 'auction', label: 'Auction', icon: 'gavel', color: 'red' },
        { value: 'giveaway', label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-2' }
      ],
      minutes: ['00', '15', '30', '45'],
      hours: ['1', '2', '3', '4','5', '6', '7', '8', '9', '10', '11', '12'],
      ampm: ['AM', 'PM']
    }
  },
  computed: {
    ...mapState({
      newProduct: state => state.newProduct,
      categories: state => state.categories
    }),
    price: {
      get() {
        return this.$store.state.newProduct.price.split(' ')[0]
      },

      set(price) {
        this.$store.state.newProduct.price = price + ' SBD'
      }
    },
    startingPrice: {
      get() {
        return this.$store.state.newProduct.startingPrice.split(' ')[0]
      },

      set(startingPrice) {
        this.$store.state.newProduct.startingPrice = startingPrice + ' SBD'
      }
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    ...mapActions({
      setType: 'newProduct/setType',
      addPicture: 'newProduct/addPicture',
      removePicture: 'newProduct/removePicture'
    }),
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')

      this.$store.state.newProduct.timeLeftDate = new Date(year, month, day)

      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    // allowedDates(val) {
    //   console.log('value')
    //   console.log(val)
    //   console.log('value parsed')
    //   console.log(Date.parse(val))
    //   console.log('tday parsed')
    //   console.log(Date.parse(new Date()))
    //   console.log('resta')
    //   console.log(Date.parse(val)-Date.parse(new Date()))
    //   console.log('condicion')
    //   console.log((Date.parse(val)-Date.parse(new Date())<0))
    //   return (Date.parse(val)-Date.parse(new Date())<0)
    // }
    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>