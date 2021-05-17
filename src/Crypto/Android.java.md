```kotlin
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.R.attr.key
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val plainText = "this is my plain text"
        val key = "your key"

        val cryptLib = CryptLib()

        val cipherText = cryptLib.encryptPlainTextWithRandomIV(plainText, key)
        println("cipherText $cipherText")

        val decryptedString = cryptLib.decryptCipherTextWithRandomIV(cipherText, key)
        println("decryptedString $decryptedString")

    }
}
```
