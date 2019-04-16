window.addEventListener('load', init);

function init() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // シーンを作成
  var scene = new THREE.Scene();

  // カメラを作成
  // new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 50);

  // 平行光源
  var light = new THREE.DirectionalLight(0xFFFFFF);
  light.position.set(1, 1, 1);
  scene.add(light);
  // 環境光
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // モデル
  var loader = new THREE.STLLoader();
  loader.load('./armadillo.stl', function (geometry) {
    var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);
  });

  render();

  function render() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
}
