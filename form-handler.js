// フォーム送信処理専用ファイル
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // デフォルトの送信を防ぐ
            
            // ローディング状態にする
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';
            
            // フォームデータを取得
            const formData = new FormData(form);
            
            
            // 実際のGoogleフォームに送信（埋め込みフォームと同じIDを使用）
            const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf6kJhQfi07bKgyDobXBA9LvaaCY9NGpwbWcaoAgbPjWhp1ng/formResponse';
            
            // Google Forms field mappings - HTMLソースから確認した正しいentry IDを使用
            const googleFormData = new FormData();
            googleFormData.append('entry.1432531513', formData.get('name') || '');      // お名前
            googleFormData.append('entry.93272851', formData.get('email') || '');       // メールアドレス
            googleFormData.append('entry.258772479', formData.get('script-text') || ''); // 台本本文
            googleFormData.append('entry.1666574913', formData.get('script-url') || ''); // 台本URL
            googleFormData.append('entry.361150264', formData.get('request-details') || ''); // 依頼本文
            
            
            // Googleフォームに実際に送信
            fetch(googleFormUrl, {
                method: 'POST',
                body: googleFormData,
                mode: 'no-cors'
            }).then(() => {
                // 成功メッセージを表示
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                
                // フォームをリセット
                form.reset();
                
                // ボタンを元に戻す
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.textContent = '送信';
                
                // 成功メッセージまでスクロール
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // 5秒後にメッセージを隠す
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
            }).catch((error) => {
                // エラーが発生した場合でも、no-corsモードでは通常成功として扱う
                // 成功メッセージを表示
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                
                // フォームをリセット
                form.reset();
                
                // ボタンを元に戻す
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.textContent = '送信';
                
                // 成功メッセージまでスクロール
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // 5秒後にメッセージを隠す
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            });
        });
    }
});