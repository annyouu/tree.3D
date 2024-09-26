import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"




//scene(シーンの作成)
const scene = new THREE.Scene();

//サイズの設定
const sizes = {
  width: innerWidth,
  height: innerHeight,
}


//カメラの作成
// const camera = new THREE.PerspectiveCamera(fov, aspect,near,far);
//fov:カメラの視野 aspect アスペクト比
// window.innerWidth / window.innerHeight を使う。
// near 近くの可視距離 far 遠くの可視距離
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 3, 65);

//レンダラーの作成  
//レンダラーの役割 : Three.jsのsceneとCameraを使って、
//3Dオブジェクトやエフェクトを2D画面に変換する。 

// THREE.WebGLRenderer() WebGLを使用して 3Dグラフィックを描く。
// setSize(sizes.width, sizes.height)
// レンダラーの描画領域のサイズを設定
//renderer.domElementは、HTMLのcanvas要素を指している。
//document.body.appendChild(renderer.domElement)はcanvas要素をHTMLドキュメントの<dody>要素に追加をしている。これによりレンダラーの描画する内容がWebページ上に表示される。
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.setClearColor("#262837");

//road 地面を作る
//THREE.MeshStandardMaterial:
//光の反射や影のリアルな表現を行うためのマテリアル 
//const roadGeometry = new THREE.PlaneGeometry(40, 100);
// PlaneGeometry 2D平面を作成する
// 長さ40単位 幅100単位の平面を作成している。
//THREE.Mesh(roadGeometry, roadMaterial)
//ジオメトリ(形状)とマテリアル(表面の属性)を組み合わせて、
//3Dオブジェクトを作成する
//road.rotation:元々地面は、Z軸に水平なため、90ド回転させて、
//xy軸に水平であるようにする。

const roadMaterial = new THREE.MeshStandardMaterial({
  color: "skyblue",
});
const roadGeometry = new THREE.PlaneGeometry(70, 200);
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI * 0.5;
scene.add(road);

const stemMaterial = new THREE.MeshStandardMaterial({
  color: "brown",
});

const leafMaterial = new THREE.MeshStandardMaterial({
  color: "green",
});

const petalCount = 6;

// 花びらの作成
const petalMaterial = new THREE.MeshStandardMaterial({
  color: "pink"
});
const petalGeometry = new THREE.ConeGeometry(2, 8, 5);

//花神
const centerMaterial = new THREE.MeshStandardMaterial({
  color: "yellow"
});
const CircleGeometry = new THREE.CircleGeometry(1.5, 32, 2);


//茎
const flowstemMaterial = new THREE.MeshStandardMaterial({
  color: "green"
});
const flowstemGeometry = new THREE.CylinderGeometry(0.5, 0.5, 20, 6);

for (let w = 0; w < 5; w++) {
  const flower = new THREE.Group();

  flower.position.x = (Math.random() * 2 - 1) * 20;
  flower.position.z = (Math.random() - 0.5) * 100;
  flower.scale.set(0.5,0.5,0.5);
  scene.add(flower);
  //はなびら
  for (let i = 0; i < petalCount; i++) {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    petal.rotation.z = ((i / petalCount) * Math.PI * 2);
    petal.rotation.x = -Math.PI * 0.5;
    petal.position.y = 20
    petal.scale.set(0.8, 0.8, 0.8);
    flower.add(petal);

    // 中心
    const center = new THREE.Mesh(CircleGeometry, centerMaterial);
    center.rotation.x = -Math.PI * 0.5;
    center.position.y = 21.2;
    flower.add(center);

    const flowstem = new THREE.Mesh(flowstemGeometry, flowstemMaterial);
    flowstem.position.y = 10;
    flower.add(flowstem);
  }

}



for (let i = 0; i < 25; i++) {
  //tree
  const tree = new THREE.Group();
  tree.position.x = (Math.random() * 2 - 1) * 20;
  tree.position.z = (Math.random() - 0.5) * 100;
  scene.add(tree);
  //stem 木の幹
  //MeshStandardMaterial: リアルな表現を行うためのマテリアル
  //BoxGeometry(1, 10, 1) 幅1 高さ 10 奥行 1 の直方体を作成。
  const stem = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 1), stemMaterial);
  stem.position.y = 5;
  tree.add(stem);

  //leaf 葉っぱ
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16), leafMaterial);
  leaf.position.y = 12;
  tree.add(leaf);
}

//light 明かり
//AmbientLight:シーン全体を均等に照らすためのライト。
//どの方向からも光が均一に届く シーン内の全てのオブジェクトが一定の明るさで表示される。(影を作らない)
const ambientLight = new THREE.AmbientLight(0xffffff, 4)
scene.add(ambientLight);
//DirectionalLight:特定の方向から光を出す。 影を作ることができる。
const directionalLight = new THREE.DirectionalLight(0x00ffff, 4);
scene.add(directionalLight);

//fog 霧
const fog = new THREE.Fog("#262837", 50, 7);
scene.fog = fog;

//controls カメラの制御 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//経過時間の取得
const clock = new THREE.Clock();


function animate() {
  //camera update
  // const elapsedTime = clock.getElapsedTime();
  // camera.position.x = Math.cos((Math.PI * elapsedTime) * 0.15) * 20;
  // camera.position.z = Math.sin((Math.PI * elapsedTime) * 0.15) * 20;
  // camera.lookAt(0, 3, 0);
  controls.update();



  renderer.render(scene, camera);
  requestAnimationFrame(animate); //②
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

animate(); // ①

//renderer.scene 描画するシーン camera指定したシーンをカメラを使って描画 シーンの内容をカメラに描画する
//requestAnimationFrame(animate)アニメーションをスムーズにするために
// ①で関数を呼び出して、②次のフレームにまたanimate関数を呼んでループを行う。















