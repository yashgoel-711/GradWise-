# phi2_local_inference.py
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch # type: ignore

model_id = "microsoft/phi-2"

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32)
model.eval()

if torch.cuda.is_available():
    model.to("cuda")

def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=150,
            do_sample=True,
            top_p=0.95,
            temperature=0.8,
        )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)
