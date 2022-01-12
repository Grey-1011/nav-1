const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)//把字符串变成对象
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')  //正则表达式--删除/开头的内容 
}
const render = () => {
    $siteList.find('li:not(.last)').remove() //找到ul里面的所有li.唯独不要last
    hashMap.forEach((node,index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="more">
                    <svg class="icon">
                        <use xlink:href="#icon-more"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',(e)=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()//阻止冒泡
            console.log(hashMap);
            hashMap.splice(index,1)// 删除数组中 index对应的元素
            render()//重新渲染
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: 'text',
        url: url
    })
    render()
})

window.onbeforeunload = ()=>{ //关闭页面时，把hashMap存到localStorage
    console.log('頁面要關閉了');
    const string = JSON.stringify(hashMap)// 把对象变成字符串
    localStorage.setItem('x',string) //存储在本地的，设置x的值为string
}
$(document).on('keypress',(e) =>{
    // const key = e.key 相当于下面的
    const {key} = e
    for(let i = 0; i< hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})
