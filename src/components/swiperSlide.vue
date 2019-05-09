<template>
    <div class="swiper-container productone-swiper" :class="[`swiper-container-${index}`]">
        <div class="swiper-pagination productone-swiper-pagination" :class="[`swiper-pagination-${index}`]" slot="pagination"></div>
        <div class="swiper-wrapper">
            <div class="swiper-slide productSlide" v-for="(items, index) in productsArr" :key="index">
                <div class="products swiper-slide-item" v-for="(item,index) in items" :key="index" @click.stop="goProduct(item.id)">
                    <div class="posiLabel" >
                        <div v-if=" typeof item.is_review != 'undefined' &&  item.is_review!=null" >
                            <div v-if="item.is_review.havedate == 1">
                                <span class="poodtIconSpan">{{item.is_review.datetime}}</span><img src="@/assets/img/read-already.png" alt="">
                            </div>
                            <div v-else-if="item.is_review.havedate == 2">
                                <span class="poodtIconSpan">{{item.is_review.datetime}}</span><img src="@/assets/img/apply-already.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="productsIcon"><img :src="item.loan_logo"></div>
                    <div class="productTop" @click.stop="gothreeProduct(item)"></div>
                    <div class="productdesc">
                        <h3>{{ item.loan_name }}</h3>
                        <p>额度：
                            <span class="edu">{{ item.loan_small/10000 }}-{{ item.loan_big/10000 }}万</span>
                        </p>
                        <p>利率：
                            <span class="lilv">{{ item.loan_interest }}%</span>
                        </p>
                    </div>
                    <span class="posIcon"><img :src="item.icon_name" alt=""></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { applylook, paramData } from "../api/api";
export default {
    name: "swiperSlide",
    indexreview: true,
    props: {
        products: Array,
        index: Number
    },
    data() {
        return {};
    },
    // is_review_img: require ("@/assets/img/read-already.png"),
    computed: {
        productsArr() {
            const produc = this.products;
            const proarr = []; //准备空的2维数组
            let prominArr = []; //准备一个小数组（最大长度为8）      //遍历categorys
            produc.forEach((item, index) => {
                //如果当前小数组已经满了，则重新创建一个新的
                if (prominArr.length === 9) {
                    prominArr = [];
                }
                //如果prominArr是空的，将小数组保存到大数组中
                if (prominArr.length === 0) {
                    proarr.push(prominArr);
                }
                //将当前分类保存到小数组中
                prominArr.push(item);
            });
            // console.log("itemproduct:" + JSON.stringify(proarr));
            return proarr;
        }
    },
    watch: {
        products(value) {
            this.$nextTick(() => {
                var products = new Swiper(`.swiper-container-${index}`, {
                    loop: false,
                    pagination: `.swiper-pagination-${index}`
                });
            });
        }
    },
    mounted() {},
    methods: {}
};
</script>
