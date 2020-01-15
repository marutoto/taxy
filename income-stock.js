(function () {
    function getRatioDeduction(nen) {
        if (nen <= 1950000) {
            return [0.05, 0]
        } else if (1950000 < nen && nen <= 3300000) {
            return [0.1, 97500]
        } else if (3300000 < nen && nen <= 6950000) {
            return [0.2, 427500]
        } else if (6950000 < nen && nen <= 9000000) {
            return [0.23, 636000]
        } else if (9000000 < nen && nen <= 18000000) {
            return [0.33, 1536000]
        } else if (18000000 < nen && nen <= 40000000) {
            return [0.4, 2796000]
        } else if (40000000 < nen) {
            return [0.45, 4796000]
        }
    }

    // ---

    // # 所得税計算
    // ref. https://www.nta.go.jp/taxes/shiraberu/shinkoku/tebiki/2018/b/03/order4/3-4_26.htm

    var nenshuu = Number(prompt('年収？（万円）'))
    var stock = Number(prompt('ストックオプション？（万円）'))

    var valid = (function () {
        return (
            !isNaN(nenshuu) && !isNaN(stock) && 0 < nenshuu && 0 < stock
        )
    })()

    if (!valid) {
        alert('ちゃんと入れて')
        return
    }

    nenshuu = nenshuu * 10000
    stock = stock * 10000

    // Retio, Deduction
    var ret = getRatioDeduction(nenshuu)
    var ratio = ret[0]
    var deduction = ret[1]

    var ret = getRatioDeduction(nenshuu+stock)
    var ratioWithSto = ret[0]
    var deductionWithSto = ret[1]


    console.log(`## 税率・控除額
所得税率: ${ratio}
控除額: ${deduction}円

所得税率(ストックオプション含む): ${ratioWithSto}
控除額(ストックオプション含む): ${deductionWithSto}円
`)

    console.log("---\n")

    var calc1 = Math.round(nenshuu * ratio - deduction)
    console.log(`## 給与としてすでに払ってる額（年間）
${nenshuu} * [税率]${ratio} - [控除額]${deduction}
= ${calc1}円

`)

    var calc2 = Math.round((nenshuu + stock) * ratioWithSto - deductionWithSto)
    console.log(`## ストックオプションを給与所得として加算した場合に、実際に年間で支払わなければならない額
(${nenshuu} + ${stock}) * [税率]${ratioWithSto} - [控除額]${deductionWithSto}
= ${calc2}円

`)

    var calc3 = Math.round(calc2 - calc1)
    console.log(`## ストックオプションの収入を確定申告して、所得税として収めなければならない額
${calc2} - ${calc1}
= ${calc3}円 ・・・①

`)

    var calc4 = Math.round(stock * 0.1)
    console.log(`## さらに、翌年からの住民税が上がる（概算。多分控除が入るか、大元の金額がもう少し安くなると思う）
${stock} * 0.1
= ${calc4}円 ・・・②

`)

    console.log("---\n")

    var calc5 = Math.round(calc3 + calc4)
    var calc6 = Math.ceil((calc5 / stock) * 1000) / 1000 // 小数第三位まで切り上げ
    var calc7 = calc6 * 100
    console.log(`## 【結論】給与所得としてのストックオプションに掛かる税金
① + ②
= ${calc3} + ${calc4}
= ${calc5}円

${calc5} / ${stock}
= ${calc6}
= ${calc7}%

`)

    console.log("---\n")

// ---

    console.log(`①は一括振り込みだろうけど
②は時間差でくるから、ちゃんと${calc4}円とっとかないとだめ
`)

})()
