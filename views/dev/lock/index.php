<?php include __DIR__ . '/../index.php'; ?>
<div class="center top-relative">
  <div class="content voilet1">
    <span>Enter Password for Encryption</span>
    <input class="f15pt" type="password" id="passcode" placeholder="password" />
  </div>
  <div class="content voilet2">
    <span>Put Or Type Text Here</span>
    <textarea id="originalContent"></textarea>
  </div>
  <div class="content voilet0">
    <span>Encrypted Form</span>
    <textarea id="encryptedContent" readonly></textarea>
  </div>
  <div class="content voilet0">
    <span>Decrypted Form</span>
    <textarea id="decryptedContent" readonly></textarea>
  </div>
  <button class="encrypt"
    onclick="webdevencrypt.setEncrypt('originalContent','encryptedContent','passcode')">Encrypt</button>
  <button class="encrypt"
    onclick="webdevencrypt.setDecrypt('originalContent','decryptedContent','passcode')">Decrypt</button>
</div>
<script>
  <?php include __DIR__ . '/script.js'; ?>
</script>
<style>
  <?php include __DIR__ . '/style.css'; ?>
</style>